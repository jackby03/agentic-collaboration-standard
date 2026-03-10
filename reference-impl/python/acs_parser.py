"""
ACS Reference Parser (Python)
Discovers and parses .agents/ folder structure.
"""

import os
import yaml
from pathlib import Path
from dataclasses import dataclass
from typing import Optional

@dataclass
class ACSManifest:
    acs_version: str
    project_name: str
    project_description: str
    layers: dict

@dataclass
class ACSSkill:
    name: str
    description: str
    location: Path

@dataclass
class ACSProject:
    root: Path
    manifest: ACSManifest
    skills: list[ACSSkill]
    context_files: list[Path]
    commands: list[Path]
    agents: list[Path]

def find_acs_root(start: Path) -> Optional[Path]:
    """Walk up from start path to find .agents/acs.yaml"""
    current = start.resolve()
    while current != current.parent:
        candidate = current / ".agents" / "acs.yaml"
        if candidate.exists():
            return current
        current = current.parent
    return None

def parse_manifest(root: Path) -> ACSManifest:
    manifest_path = root / ".agents" / "acs.yaml"
    with open(manifest_path) as f:
        data = yaml.safe_load(f)
    return ACSManifest(
        acs_version=data["acs_version"],
        project_name=data["project"]["name"],
        project_description=data["project"]["description"],
        layers=data.get("layers", {})
    )

def discover_skills(root: Path) -> list[ACSSkill]:
    skills_dir = root / ".agents" / "skills"
    if not skills_dir.exists():
        return []
    skills = []
    for skill_dir in skills_dir.iterdir():
        skill_md = skill_dir / "SKILL.md"
        if skill_md.exists():
            with open(skill_md) as f:
                content = f.read()
            # Parse frontmatter
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    fm = yaml.safe_load(parts[1])
                    skills.append(ACSSkill(
                        name=fm.get("name", skill_dir.name),
                        description=fm.get("description", ""),
                        location=skill_md
                    ))
    return skills

def load_project(start: Path = None) -> Optional[ACSProject]:
    if start is None:
        start = Path.cwd()
    root = find_acs_root(start)
    if root is None:
        return None
    manifest = parse_manifest(root)
    skills = discover_skills(root)
    agents_dir = root / ".agents"
    context_files = list((agents_dir / "context").glob("*.md")) if (agents_dir / "context").exists() else []
    commands = list((agents_dir / "commands").glob("*.md")) if (agents_dir / "commands").exists() else []
    agents = list((agents_dir / "agents").glob("*.md")) if (agents_dir / "agents").exists() else []
    return ACSProject(root=root, manifest=manifest, skills=skills,
                      context_files=context_files, commands=commands, agents=agents)

if __name__ == "__main__":
    project = load_project()
    if project:
        print(f"ACS project: {project.manifest.project_name}")
        print(f"Skills: {[s.name for s in project.skills]}")
        print(f"Context files: {[f.name for f in project.context_files]}")
    else:
        print("No ACS project found in current directory tree.")
