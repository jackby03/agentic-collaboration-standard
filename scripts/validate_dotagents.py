#!/usr/bin/env python3
"""Prototype validator for frontmatter-based `.agents/` interoperability layouts."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any, List, Tuple


ROOT = Path(__file__).resolve().parents[1]
SCHEMA_DIR = ROOT / "schemas" / "v1"


def load_json(path: Path) -> Any:
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def parse_scalar(value: str) -> Any:
    value = value.strip()
    if value in {"true", "false"}:
        return value == "true"
    if re.fullmatch(r"-?\d+", value):
        return int(value)
    if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
        return value[1:-1]
    return value


def parse_simple_yaml_block(lines: List[str], start: int, indent: int) -> Tuple[Any, int]:
    items: List[Any] = []
    mapping: dict[str, Any] = {}
    mode: str | None = None
    index = start

    while index < len(lines):
        raw = lines[index]
        if not raw.strip():
            index += 1
            continue

        current_indent = len(raw) - len(raw.lstrip(" "))
        if current_indent < indent:
            break
        if current_indent > indent:
            raise ValueError(f"Unexpected indentation at line {index + 1}")

        stripped = raw.strip()
        if stripped.startswith("- "):
            if mode is None:
                mode = "list"
            elif mode != "list":
                raise ValueError(f"Mixed list and mapping syntax at line {index + 1}")

            item_text = stripped[2:].strip()
            if item_text:
                items.append(parse_scalar(item_text))
                index += 1
            else:
                nested, next_index = parse_simple_yaml_block(lines, index + 1, indent + 2)
                items.append(nested)
                index = next_index
            continue

        if ":" not in stripped:
            raise ValueError(f"Expected key/value pair at line {index + 1}")

        if mode is None:
            mode = "map"
        elif mode != "map":
            raise ValueError(f"Mixed list and mapping syntax at line {index + 1}")

        key, remainder = stripped.split(":", 1)
        key = key.strip()
        remainder = remainder.strip()
        if remainder:
            mapping[key] = parse_scalar(remainder)
            index += 1
            continue

        nested, next_index = parse_simple_yaml_block(lines, index + 1, indent + 2)
        mapping[key] = nested
        index = next_index

    return (items if mode == "list" else mapping), index


def parse_frontmatter(path: Path) -> Tuple[dict[str, Any], str]:
    content = path.read_text(encoding="utf-8")
    if not content.startswith("---\n"):
        raise ValueError("Missing YAML frontmatter")

    body_start = content.find("\n---\n", 4)
    if body_start == -1:
        raise ValueError("Malformed frontmatter")

    frontmatter_text = content[4:body_start]
    body = content[body_start + 5 :]
    data, _ = parse_simple_yaml_block(frontmatter_text.splitlines(), 0, 0)
    if not isinstance(data, dict):
        raise ValueError("Frontmatter must be a mapping")
    return data, body


def validate_schema(data: Any, schema: dict[str, Any], path: str = "$") -> List[str]:
    errors: List[str] = []
    expected_type = schema.get("type")

    type_ok = True
    if expected_type == "object":
        type_ok = isinstance(data, dict)
    elif expected_type == "array":
        type_ok = isinstance(data, list)
    elif expected_type == "string":
        type_ok = isinstance(data, str)
    elif expected_type == "boolean":
        type_ok = isinstance(data, bool)
    elif expected_type == "integer":
        type_ok = isinstance(data, int) and not isinstance(data, bool)

    if expected_type and not type_ok:
        return [f"{path}: expected {expected_type}"]

    if "enum" in schema and data not in schema["enum"]:
        errors.append(f"{path}: must be one of {schema['enum']}")

    if isinstance(data, str):
        max_length = schema.get("maxLength")
        if isinstance(max_length, int) and len(data) > max_length:
            errors.append(f"{path}: exceeds maxLength {max_length}")
        pattern = schema.get("pattern")
        if pattern and not re.match(pattern, data):
            errors.append(f"{path}: does not match pattern {pattern}")

    if isinstance(data, dict):
        for key in schema.get("required", []):
            if key not in data:
                errors.append(f"{path}: missing required field `{key}`")
        properties = schema.get("properties", {})
        for key, value in data.items():
            subschema = properties.get(key)
            if subschema:
                errors.extend(validate_schema(value, subschema, f"{path}.{key}"))

    if isinstance(data, list):
        item_schema = schema.get("items")
        if item_schema:
            for index, item in enumerate(data):
                errors.extend(validate_schema(item, item_schema, f"{path}[{index}]"))

    return errors


def validate_markdown(path: Path, schema_name: str) -> List[str]:
    schema = load_json(SCHEMA_DIR / schema_name)
    try:
        frontmatter, _ = parse_frontmatter(path)
    except ValueError as exc:
        return [f"{path}: {exc}"]
    return [f"{path}: {error}" for error in validate_schema(frontmatter, schema)]


def validate_dotagents(root: Path) -> dict[str, List[str]]:
    base = root / ".agents"
    results = {"errors": [], "warnings": []}

    if not base.exists():
        results["errors"].append("Missing .agents/")
        return results

    manifest = base / "mcp.json"
    if not manifest.exists():
        results["errors"].append("Missing .agents/mcp.json")
        return results

    manifest_schema = load_json(SCHEMA_DIR / "manifest.schema.json")
    try:
        manifest_data = load_json(manifest)
    except json.JSONDecodeError as exc:
        results["errors"].append(f"{manifest}: invalid JSON ({exc})")
        return results
    results["errors"].extend(
        [f"{manifest}: {error}" for error in validate_schema(manifest_data, manifest_schema)]
    )

    for agent_md in sorted(base.glob("agents/*/agent.md")):
        results["errors"].extend(validate_markdown(agent_md, "agent.schema.json"))
    for skill_md in sorted(base.glob("skills/*/skill.md")):
        results["errors"].extend(validate_markdown(skill_md, "skill.schema.json"))
    for task_md in sorted(base.glob("tasks/*/task.md")):
        results["errors"].extend(validate_markdown(task_md, "task.schema.json"))
    for memory_md in sorted(base.glob("memories/*.md")):
        results["errors"].extend(validate_markdown(memory_md, "memory.schema.json"))

    if not list(base.glob("agents/*/agent.md")):
        results["warnings"].append("No agent definitions found in .agents/agents/")
    if not list(base.glob("skills/*/skill.md")):
        results["warnings"].append("No skill definitions found in .agents/skills/")

    return results


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    results = validate_dotagents(root)
    if results["errors"]:
        print(f"FAIL {root}")
        for error in results["errors"]:
            print(f"  - {error}")
        return 1
    print(f"OK {root}")
    for warning in results["warnings"]:
        print(f"  ! {warning}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
