"""
ACS Reference Validator (Python)
Validates .agents/ files against ACS v1.0 spec.
"""

import yaml
import re
from pathlib import Path
from typing import List

def validate_manifest(path: Path) -> List[str]:
    errors = []
    with open(path) as f:
        data = yaml.safe_load(f)
    if not data.get("version"):
        errors.append("Missing required field: version")
    elif data["version"] != "1.0":
        errors.append(f"Unknown version: {data['version']}")
    if "project" not in data:
        errors.append("Missing required section: project")
    else:
        if not data["project"].get("name"):
            errors.append("Missing required field: project.name")
        elif not re.match(r'^[a-z0-9-]+$', data["project"]["name"]):
            errors.append("project.name must be lowercase alphanumeric with hyphens")
        if not data["project"].get("description"):
            errors.append("Missing required field: project.description")
        elif len(data["project"]["description"]) > 512:
            errors.append("project.description exceeds 512 characters")
    return errors

def validate_skill(path: Path) -> List[str]:
    errors = []
    with open(path) as f:
        content = f.read()
    if not content.startswith("---"):
        errors.append(f"{path}: Missing YAML frontmatter")
        return errors
    parts = content.split("---", 2)
    if len(parts) < 3:
        errors.append(f"{path}: Malformed frontmatter")
        return errors
    fm = yaml.safe_load(parts[1])
    if not fm.get("name"):
        errors.append(f"{path}: Missing required frontmatter field: name")
    if not fm.get("description"):
        errors.append(f"{path}: Missing required frontmatter field: description")
    elif len(fm["description"]) > 1024:
        errors.append(f"{path}: description exceeds 1024 characters")
    return errors

def validate_project(root: Path) -> dict:
    results = {"errors": [], "warnings": []}
    manifest = root / ".agents" / "main.yaml"
    if not manifest.exists():
        results["errors"].append("Missing .agents/main.yaml")
        return results
    results["errors"].extend(validate_manifest(manifest))
    for skill_md in (root / ".agents" / "skills").rglob("SKILL.md"):
        results["errors"].extend(validate_skill(skill_md))
    return results

if __name__ == "__main__":
    import sys
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    results = validate_project(root)
    if results["errors"]:
        print(f"❌ Validation failed: {root}")
        for e in results["errors"]: print(f"  - {e}")
        sys.exit(1)
    else:
        print(f"✅ {root} is valid")
