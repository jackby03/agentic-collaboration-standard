"""ACS CLI entry point."""

import argparse
import sys

from acs_cli.commands import init, validate, ls


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="acs",
        description="CLI for the Agentic Collaboration Standard",
    )
    parser.add_argument("--version", action="version", version="acs 1.0.0")

    subparsers = parser.add_subparsers(dest="command", metavar="<command>")
    subparsers.required = True

    # acs init
    init_parser = subparsers.add_parser("init", help="Scaffold a new .agents/ folder")
    init_parser.set_defaults(func=init.run)

    # acs validate
    validate_parser = subparsers.add_parser("validate", help="Validate all ACS files")
    validate_parser.add_argument("-p", "--path", metavar="DIR", help="Project root (default: cwd)")
    validate_parser.set_defaults(func=validate.run)

    # acs ls
    ls_parser = subparsers.add_parser("ls", help="List all discovered layers, skills, commands, and agents")
    ls_parser.add_argument("-p", "--path", metavar="DIR", help="Project root (default: cwd)")
    ls_parser.set_defaults(func=ls.run)

    args = parser.parse_args()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()
