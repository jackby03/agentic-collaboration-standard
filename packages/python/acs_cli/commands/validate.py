"""acs validate — validate all ACS files in the current project."""

import os
import sys
from pathlib import Path

_HERE = os.path.dirname(__file__)
_REPO_ROOT = os.path.abspath(os.path.join(_HERE, "..", "..", "..", ".."))
_REFIMPL = os.path.join(_REPO_ROOT, "reference-impl", "python")
if _REFIMPL not in sys.path:
    sys.path.insert(0, _REFIMPL)

from acs_validator import validate_project  # noqa: E402
from acs_parser import find_acs_root  # noqa: E402


def run(args) -> int:
    start = Path(args.path) if args.path else Path.cwd()
    root = find_acs_root(start)

    if root is None:
        print("\033[31m✗ No .agents/main.yaml found in this directory or any parent.\033[0m", file=sys.stderr)
        return 1

    print(f"\033[2mValidating: {root}\033[0m")
    result = validate_project(root)
    errors = result.get("errors", [])

    if not errors:
        print("\033[32m✓ ACS project is valid.\033[0m")
        return 0
    else:
        print(f"\033[31m✗ Found {len(errors)} error(s):\033[0m\n")
        for err in errors:
            print(f"  \033[31m•\033[0m {err}")
        return 1
