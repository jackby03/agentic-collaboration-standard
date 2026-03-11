import * as fs from "fs";
import * as path from "path";

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeFile(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

export function generateMainYaml(opts: {
  name: string;
  description: string;
  language: string | null;
  framework: string | null;
  layers: Record<string, boolean>;
}): string {
  const lines: string[] = ["version: \"1.0\"", "", "project:"];
  lines.push(`  name: "${opts.name}"`);
  lines.push(`  description: "${opts.description}"`);
  if (opts.language) lines.push(`  language: ${opts.language}`);
  if (opts.framework) lines.push(`  framework: ${opts.framework}`);

  const activeLayerKeys = Object.entries(opts.layers)
    .filter(([, v]) => v)
    .map(([k]) => k);

  if (activeLayerKeys.length > 0) {
    lines.push("", "layers:");
    for (const [key, val] of Object.entries(opts.layers)) {
      lines.push(`  ${key}: ${val}`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

export function generateContextMd(projectName: string): string {
  return `# Project Context

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
`;
}

export function generateSkillMd(skillName: string): string {
  return `---
name: ${skillName}
description: Describe what this skill does and when to use it. Be specific.
---

## Steps

1. Step one
2. Step two
3. Step three
`;
}
