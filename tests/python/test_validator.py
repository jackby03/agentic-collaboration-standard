"""
Tests for ACS reference validator (Python).
Run with: pytest tests/python/ -v
"""

import sys
import pytest
from pathlib import Path

# Make the reference impl importable
sys.path.insert(0, str(Path(__file__).parents[2] / "reference-impl" / "python"))
from acs_validator import validate_manifest, validate_skill, validate_project

FIXTURES = Path(__file__).parents[1] / "fixtures"
VALID_PROJECT = FIXTURES / "valid-project"


# ---------------------------------------------------------------------------
# validate_manifest
# ---------------------------------------------------------------------------

class TestValidateManifest:
    def test_valid_manifest(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text(
            'version: "1.0"\nproject:\n  name: "my-app"\n  description: "A valid project"\n'
        )
        assert validate_manifest(f) == []

    def test_missing_version(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('project:\n  name: "my-app"\n  description: "desc"\n')
        errors = validate_manifest(f)
        assert any("version" in e for e in errors)

    def test_wrong_version(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "2.0"\nproject:\n  name: "my-app"\n  description: "desc"\n')
        errors = validate_manifest(f)
        assert any("version" in e for e in errors)

    def test_missing_project_section(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\n')
        errors = validate_manifest(f)
        assert any("project" in e for e in errors)

    def test_missing_project_name(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\nproject:\n  description: "desc"\n')
        errors = validate_manifest(f)
        assert any("project.name" in e for e in errors)

    def test_invalid_project_name_uppercase(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\nproject:\n  name: "MyApp"\n  description: "desc"\n')
        errors = validate_manifest(f)
        assert any("project.name" in e for e in errors)

    def test_invalid_project_name_spaces(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\nproject:\n  name: "my app"\n  description: "desc"\n')
        errors = validate_manifest(f)
        assert any("project.name" in e for e in errors)

    def test_valid_project_name_with_hyphens(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\nproject:\n  name: "my-app-123"\n  description: "desc"\n')
        assert validate_manifest(f) == []

    def test_missing_project_description(self, tmp_path):
        f = tmp_path / "main.yaml"
        f.write_text('version: "1.0"\nproject:\n  name: "my-app"\n')
        errors = validate_manifest(f)
        assert any("project.description" in e for e in errors)

    def test_description_too_long(self, tmp_path):
        f = tmp_path / "main.yaml"
        long_desc = "x" * 513
        f.write_text(f'version: "1.0"\nproject:\n  name: "my-app"\n  description: "{long_desc}"\n')
        errors = validate_manifest(f)
        assert any("512" in e for e in errors)

    def test_description_exactly_512_chars(self, tmp_path):
        f = tmp_path / "main.yaml"
        desc = "x" * 512
        f.write_text(f'version: "1.0"\nproject:\n  name: "my-app"\n  description: "{desc}"\n')
        assert validate_manifest(f) == []


# ---------------------------------------------------------------------------
# validate_skill
# ---------------------------------------------------------------------------

class TestValidateSkill:
    def test_valid_skill(self, tmp_path):
        f = tmp_path / "SKILL.md"
        f.write_text('---\nname: my-skill\ndescription: Does something useful.\n---\n\n## Steps\n1. Do it\n')
        assert validate_skill(f) == []

    def test_missing_frontmatter(self, tmp_path):
        f = tmp_path / "SKILL.md"
        f.write_text('# No frontmatter here\n')
        errors = validate_skill(f)
        assert any("frontmatter" in e.lower() for e in errors)

    def test_malformed_frontmatter(self, tmp_path):
        f = tmp_path / "SKILL.md"
        f.write_text('---\nname: skill\n')  # no closing ---
        errors = validate_skill(f)
        assert len(errors) > 0

    def test_missing_skill_name(self, tmp_path):
        f = tmp_path / "SKILL.md"
        f.write_text('---\ndescription: Does something.\n---\n\n## Steps\n')
        errors = validate_skill(f)
        assert any("name" in e for e in errors)

    def test_missing_skill_description(self, tmp_path):
        f = tmp_path / "SKILL.md"
        f.write_text('---\nname: my-skill\n---\n\n## Steps\n')
        errors = validate_skill(f)
        assert any("description" in e for e in errors)

    def test_description_too_long(self, tmp_path):
        f = tmp_path / "SKILL.md"
        long_desc = "x" * 1025
        f.write_text(f'---\nname: my-skill\ndescription: "{long_desc}"\n---\n\n## Steps\n')
        errors = validate_skill(f)
        assert any("1024" in e for e in errors)


# ---------------------------------------------------------------------------
# validate_project
# ---------------------------------------------------------------------------

class TestValidateProject:
    def test_valid_project(self):
        results = validate_project(VALID_PROJECT)
        assert results["errors"] == [], f"Unexpected errors: {results['errors']}"

    def test_missing_manifest(self, tmp_path):
        results = validate_project(tmp_path)
        assert any("main.yaml" in e for e in results["errors"])

    def test_valid_project_with_skill(self):
        results = validate_project(VALID_PROJECT)
        assert results["errors"] == []

    def test_project_with_bad_skill(self, tmp_path):
        agents = tmp_path / ".agents"
        agents.mkdir()
        manifest = agents / "main.yaml"
        manifest.write_text('version: "1.0"\nproject:\n  name: "my-app"\n  description: "desc"\n')
        skill_dir = agents / "skills" / "broken-skill"
        skill_dir.mkdir(parents=True)
        (skill_dir / "SKILL.md").write_text("no frontmatter here")
        results = validate_project(tmp_path)
        assert any("frontmatter" in e.lower() for e in results["errors"])
