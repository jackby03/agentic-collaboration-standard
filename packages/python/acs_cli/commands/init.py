"""acs init — scaffold a new .agents/ folder in the current project."""

import os
import re
import sys
from pathlib import Path

from acs_cli.utils.detect import detect_project
from acs_cli.utils.scaffold import (
    generate_context_md,
    generate_main_yaml,
    generate_skill_md,
    write_file,
)

LAYERS = ["context", "skills", "commands", "agents", "permissions"]


def prompt(message: str, default: str = "") -> str:
    if default:
        answer = input(f"{message} [{default}]: ").strip()
        return answer if answer else default
    return input(f"{message}: ").strip()


def confirm(message: str, default: bool = False) -> bool:
    suffix = " [Y/n]" if default else " [y/N]"
    answer = input(message + suffix + ": ").strip().lower()
    if not answer:
        return default
    return answer in ("y", "yes")


def prompt_layers() -> dict:
    print("Which layers do you want to scaffold? (Enter comma-separated list)")
    print(f"  Available: {', '.join(LAYERS)}")
    print("  Default: context")
    raw = input("Layers [context]: ").strip()
    if not raw:
        selected = {"context"}
    else:
        selected = {s.strip() for s in raw.split(",")} & set(LAYERS)
    return {layer: layer in selected for layer in LAYERS}


def run(args) -> int:
    cwd = Path(os.getcwd())
    agents_dir = cwd / ".agents"

    if agents_dir.exists():
        if not confirm(".agents/ already exists. Continue anyway?", default=False):
            print("Aborted.")
            return 0

    detected = detect_project(str(cwd))
    if detected["language"]:
        lang_info = detected["language"]
        if detected["framework"]:
            lang_info += f" / {detected['framework']}"
        print(f"\033[2mDetected: {lang_info}\033[0m")
    else:
        print("\033[2mNo framework detected — you can set it manually.\033[0m")
    print()

    name = prompt("Project name", detected["name"])
    if not re.match(r"^[a-z0-9-]+$", name):
        print(f"\033[31m✗ Project name must be lowercase alphanumeric with hyphens.\033[0m", file=sys.stderr)
        return 1

    description = ""
    while not description.strip():
        description = prompt("Project description")
        if not description.strip():
            print("  Description is required.")

    language = prompt("Primary language", detected["language"] or "")
    framework = prompt("Framework (leave blank if none)", detected["framework"] or "")
    layers = prompt_layers()

    created = []

    main_yaml = generate_main_yaml(name, description, language or None, framework or None, layers)
    write_file(str(agents_dir / "main.yaml"), main_yaml)
    created.append(".agents/main.yaml")

    if layers.get("context"):
        write_file(str(agents_dir / "context" / "project.md"), generate_context_md(name))
        created.append(".agents/context/project.md")

    if layers.get("skills"):
        write_file(str(agents_dir / "skills" / "example-skill" / "SKILL.md"), generate_skill_md("example-skill"))
        created.append(".agents/skills/example-skill/SKILL.md")

    if layers.get("commands"):
        write_file(
            str(agents_dir / "commands" / "example-command.md"),
            "---\nname: example-command\ndescription: Describe what this command does.\n---\n\n## Instructions\n\n1. Step one\n2. Step two\n",
        )
        created.append(".agents/commands/example-command.md")

    if layers.get("agents"):
        write_file(
            str(agents_dir / "agents" / "reviewer.md"),
            "# Reviewer\n\nYou are a code reviewer. Focus on correctness, clarity, and project conventions.\n",
        )
        created.append(".agents/agents/reviewer.md")

    if layers.get("permissions"):
        write_file(
            str(agents_dir / "permissions" / "policy.yaml"),
            'deny:\n  write:\n    - ".env"\n    - ".env.*"\n    - "*.pem"\n    - "*.key"\n',
        )
        created.append(".agents/permissions/policy.yaml")

    print()
    print("\033[32m✓ ACS project initialized!\033[0m")
    print()
    for f in created:
        print(f"  \033[2mcreated\033[0m  {f}")
    print()
    print("Run \033[36macs validate\033[0m to check your configuration.")
    return 0
