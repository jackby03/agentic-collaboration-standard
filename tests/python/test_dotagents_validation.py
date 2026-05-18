"""Tests for the prototype frontmatter-based `.agents/` interoperability validator."""

import sys
from pathlib import Path


ROOT = Path(__file__).parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from validate_dotagents import validate_dotagents  # noqa: E402


EXAMPLE_ROOT = ROOT / "examples" / "dotagents-example"


class TestDotagentsValidation:
    def test_example_project_is_valid(self):
        results = validate_dotagents(EXAMPLE_ROOT)
        assert results["errors"] == [], f"Unexpected errors: {results['errors']}"

    def test_missing_mcp_manifest_is_reported(self, tmp_path):
        agents_dir = tmp_path / ".agents"
        agents_dir.mkdir()
        results = validate_dotagents(tmp_path)
        assert any("mcp.json" in error for error in results["errors"])

    def test_invalid_task_missing_name_is_reported(self, tmp_path):
        agents_dir = tmp_path / ".agents"
        (agents_dir / "tasks" / "daily").mkdir(parents=True)
        (agents_dir / "mcp.json").write_text(
            '{\n  "version": "1.0",\n  "project": {"name": "demo", "description": "Demo"}\n}\n',
            encoding="utf-8",
        )
        (agents_dir / "tasks" / "daily" / "task.md").write_text(
            "---\n"
            "description: Missing name field\n"
            "schedule: daily\n"
            "---\n"
            "\n"
            "Task body.\n",
            encoding="utf-8",
        )
        results = validate_dotagents(tmp_path)
        assert any("missing required field `name`" in error for error in results["errors"])

    def test_invalid_memory_opt_in_type_is_reported(self, tmp_path):
        agents_dir = tmp_path / ".agents"
        (agents_dir / "memories").mkdir(parents=True)
        (agents_dir / "mcp.json").write_text(
            '{\n  "version": "1.0",\n  "project": {"name": "demo", "description": "Demo"}\n}\n',
            encoding="utf-8",
        )
        (agents_dir / "memories" / "notes.md").write_text(
            "---\n"
            "id: notes\n"
            "description: Test memory\n"
            "opt_in: yes\n"
            "---\n"
            "\n"
            "# Notes\n",
            encoding="utf-8",
        )
        results = validate_dotagents(tmp_path)
        assert any("$.opt_in: expected boolean" in error for error in results["errors"])
