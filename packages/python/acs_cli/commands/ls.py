"""acs ls — list all discovered ACS layers, skills, commands, and agents."""

import os
import sys

_HERE = os.path.dirname(__file__)
_REPO_ROOT = os.path.abspath(os.path.join(_HERE, "..", "..", "..", ".."))
_REFIMPL = os.path.join(_REPO_ROOT, "reference-impl", "python")
if _REFIMPL not in sys.path:
    sys.path.insert(0, _REFIMPL)

from acs_parser import find_acs_root, load_project  # noqa: E402


def run(args) -> int:
    start = args.path if args.path else os.getcwd()
    root = find_acs_root(start)

    if root is None:
        print("\033[31m✗ No .agents/main.yaml found in this directory or any parent.\033[0m", file=sys.stderr)
        return 1

    project = load_project(start)
    if project is None:
        print("\033[31m✗ Failed to load project.\033[0m", file=sys.stderr)
        return 1

    manifest = project.manifest
    print(f"\033[1m{manifest.project['name']}\033[0m  \033[2mv{manifest.version}\033[0m")
    print(f"\033[2m{manifest.project.get('description', '')}\033[0m")
    lang = " / ".join(filter(None, [manifest.project.get("language"), manifest.project.get("framework")]))
    if lang:
        print(f"\033[2m{lang}\033[0m")
    print()

    if project.skills:
        print("\033[1mSkills\033[0m")
        for s in project.skills:
            print(f"  \033[36m{s.name}\033[0m")
            if s.description:
                print(f"    \033[2m{s.description}\033[0m")
        print()

    if project.commands:
        print("\033[1mCommands\033[0m")
        for c in project.commands:
            print(f"  \033[36m{os.path.splitext(os.path.basename(c))[0]}\033[0m")
        print()

    if project.agents:
        print("\033[1mAgents\033[0m")
        for a in project.agents:
            print(f"  \033[36m{os.path.splitext(os.path.basename(a))[0]}\033[0m")
        print()

    if project.context_files:
        print("\033[1mContext\033[0m")
        for c in project.context_files:
            print(f"  \033[2m{os.path.basename(c)}\033[0m")
        print()

    if not any([project.skills, project.commands, project.agents, project.context_files]):
        print("\033[2mNo layers discovered yet. Run acs init to scaffold them.\033[0m")

    return 0
