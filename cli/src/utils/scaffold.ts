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

export function generateCommandMd(commandName: string): string {
  return `---
name: ${commandName}
description: Describe what this command does.
---

## Instructions

1. Step one
2. Step two
3. Step three
`;
}

export function generateAgentMd(agentName: string): string {
  return `---
name: ${agentName}
description: Describe this agent's role and when to invoke it.
---

# ${agentName}

You are a specialized ACS agent.
`;
}

export function generateWorkflowMd(workflowName: string): string {
  return `---
name: ${workflowName}
description: Describe the workflow and when to trigger it.
trigger: manual
steps:
  - step-one
  - step-two
---

# ${workflowName}

## Steps

1. Step one
2. Step two
3. Step three
`;
}

export function generateHookMd(hookName: string, hookPoint: string): string {
  return `---
name: ${hookName}
description: Describe what this hook enforces.
hook: ${hookPoint}
---

# ${hookName}

Use this hook to enforce a consistent behavior before or after agent actions.
`;
}

export function generateProfileMd(profileName: string): string {
  return `---
name: ${profileName}
description: Describe when to use this profile.
---

# ${profileName}

## Behavior

Define how this profile changes agent behavior and priorities.
`;
}

export function generateToolsetYaml(): string {
  return `name: default-toolset
description: Default toolset declaration for ACS-compatible tools
servers:
  - name: filesystem
    required: true
  - name: github
    required: false
`;
}

export function generateTaskMd(taskName: string): string {
  return `---
name: ${taskName}
description: Describe the repeatable task.
---

# ${taskName}

## Steps

1. Step one
2. Step two
3. Step three
`;
}

export function generateMemoryMd(memoryName: string): string {
  return `---
name: ${memoryName}
description: Describe what should be remembered.
opt_in: false
sensitivity: internal
---

# ${memoryName}

Capture durable, non-sensitive project context here.
`;
}
