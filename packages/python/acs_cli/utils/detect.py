"""Framework and language detection from project files."""

import json
import os
import re
from pathlib import Path


JS_FRAMEWORK_DEPS = {
    "next": "nextjs",
    "react": "react",
    "vue": "vue",
    "nuxt": "nuxt",
    "svelte": "svelte",
    "@sveltejs/kit": "sveltekit",
    "angular": "angular",
    "@angular/core": "angular",
    "express": "express",
    "fastify": "fastify",
    "hono": "hono",
    "remix": "remix",
    "astro": "astro",
}

PYTHON_FRAMEWORKS = ["django", "fastapi", "flask", "tornado", "aiohttp"]


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug[:64]


def detect_project(directory: str = None) -> dict:
    """Return {'name': str, 'language': str|None, 'framework': str|None}."""
    if directory is None:
        directory = os.getcwd()

    name = slugify(Path(directory).name)

    # Node.js / TypeScript
    pkg_path = Path(directory) / "package.json"
    if pkg_path.exists():
        try:
            pkg = json.loads(pkg_path.read_text(encoding="utf-8"))
            all_deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}

            framework = None
            for dep, fw in JS_FRAMEWORK_DEPS.items():
                if dep in all_deps:
                    framework = fw
                    break

            has_ts = (
                "typescript" in all_deps
                or "ts-node" in all_deps
                or (Path(directory) / "tsconfig.json").exists()
            )

            pkg_name = slugify(pkg.get("name", name)) or name
            return {
                "name": pkg_name,
                "language": "typescript" if has_ts else "javascript",
                "framework": framework,
            }
        except (json.JSONDecodeError, OSError):
            pass

    # Python
    pyproject = Path(directory) / "pyproject.toml"
    requirements = Path(directory) / "requirements.txt"
    if pyproject.exists() or requirements.exists():
        framework = None
        if requirements.exists():
            reqs = requirements.read_text(encoding="utf-8").lower()
            for fw in PYTHON_FRAMEWORKS:
                if fw in reqs:
                    framework = fw
                    break
        return {"name": name, "language": "python", "framework": framework}

    # Rust
    if (Path(directory) / "Cargo.toml").exists():
        return {"name": name, "language": "rust", "framework": None}

    # Go
    if (Path(directory) / "go.mod").exists():
        return {"name": name, "language": "go", "framework": None}

    return {"name": name, "language": None, "framework": None}
