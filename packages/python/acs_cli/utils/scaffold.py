"""File generation helpers for acs init."""

import os


def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def write_file(path: str, content: str) -> None:
    ensure_dir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def generate_main_yaml(name: str, description: str, language: str, framework: str, layers: dict) -> str:
    lines = ['version: "1.0"', "", "project:"]
    lines.append(f'  name: "{name}"')
    lines.append(f'  description: "{description}"')
    if language:
        lines.append(f"  language: {language}")
    if framework:
        lines.append(f"  framework: {framework}")

    active = [k for k, v in layers.items() if v]
    if active:
        lines.append("")
        lines.append("layers:")
        for key, val in layers.items():
            lines.append(f"  {key}: {'true' if val else 'false'}")

    lines.append("")
    return "\n".join(lines)


def generate_context_md(project_name: str) -> str:
    return f"""# Project Context

## Overview

<!-- Describe what this project does in 2-3 sentences. -->

## Stack

<!-- List the main technologies, languages, and frameworks used. -->

## Architecture

<!-- Describe the high-level structure of the codebase. -->

## Conventions

<!-- List coding conventions, naming rules, and patterns agents should follow. -->

## Do Not Touch

<!-- List files or directories agents must never modify. -->
"""


def generate_skill_md(skill_name: str) -> str:
    return f"""---
name: {skill_name}
description: Describe what this skill does and when to use it. Be specific.
---

## Steps

1. Step one
2. Step two
3. Step three
"""
