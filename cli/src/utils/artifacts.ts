import * as fs from "fs";
import * as path from "path";

import { ACSProject } from "./project";

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface FileComparison {
  path: string;
  status: "added" | "changed" | "unchanged";
  existing?: string;
  generated: string;
}

const VENDOR_TARGETS = [
  { filePath: "CLAUDE.md", title: "Claude Code" },
  { filePath: ".cursorrules", title: "Cursor" },
  { filePath: ".windsurfrules", title: "Windsurf" },
  { filePath: "GEMINI.md", title: "Gemini CLI" },
  { filePath: ".github/copilot-instructions.md", title: "GitHub Copilot" },
];

function artifactLine(label: string, value: string | undefined): string {
  return value && value.trim().length > 0 ? `${label}: ${value}` : `${label}: (not set)`;
}

function namedFileArtifact(filePath: string): ACSArtifact {
  return {
    name: path.basename(filePath, ".md"),
    description: "",
    location: filePath,
    frontmatter: {},
    body: "",
  };
}

function summarizeArtifacts(items: Array<{ name: string; description: string; location: string }>): string {
  if (items.length === 0) {
    return "- None";
  }

  return items
    .map((item) => {
      const description = item.description ? ` — ${item.description}` : "";
      return `- ${item.name}${description} (${path.relative(process.cwd(), item.location)})`;
    })
    .join("\n");
}

function summarizeProjectLayers(project: ACSProject): string {
  const enabled = Object.entries(project.manifest.layers || {})
    .filter(([, isEnabled]) => isEnabled)
    .map(([layer]) => layer);

  return enabled.length > 0 ? enabled.join(", ") : "none";
}

function buildCompanionContent(project: ACSProject, title: string): string {
  return [
    `# ${title}`,
    "",
    `This file was generated from the ACS source of truth for ${project.manifest.project.name}.`,
    "",
    "## Project",
    "",
    artifactLine("Name", project.manifest.project.name),
    artifactLine("Description", project.manifest.project.description),
    artifactLine("Language", project.manifest.project.language),
    artifactLine("Framework", project.manifest.project.framework),
    artifactLine("ACS layers", summarizeProjectLayers(project)),
    "",
    "## What to read",
    "",
    "- `.agents/main.yaml`",
    project.contextFiles.length > 0 ? "- `.agents/context/`" : "",
    project.skills.length > 0 ? "- `.agents/skills/`" : "",
    project.commands.length > 0 ? "- `.agents/commands/`" : "",
    project.agents.length > 0 ? "- `.agents/agents/`" : "",
    project.workflows.length > 0 ? "- `.agents/workflows/`" : "",
    project.hooks.length > 0 ? "- `.agents/hooks/`" : "",
    project.profiles.length > 0 ? "- `.agents/profiles/`" : "",
    project.toolsets.length > 0 ? "- `.agents/tools/`" : "",
    project.tasks.length > 0 ? "- `.agents/tasks/`" : "",
    project.memories.length > 0 ? "- `.agents/memories/`" : "",
    "",
    "## Current ACS surface",
    "",
    `### Skills\n${summarizeArtifacts(project.skills)}`,
    `\n### Commands\n${summarizeArtifacts(project.commands.map(namedFileArtifact))}`,
    `\n### Agents\n${summarizeArtifacts(project.agents.map(namedFileArtifact))}`,
    `\n### Workflows\n${summarizeArtifacts(project.workflows)}`,
    `\n### Hooks\n${summarizeArtifacts(project.hooks)}`,
    `\n### Profiles\n${summarizeArtifacts(project.profiles)}`,
    `\n### Toolsets\n${summarizeArtifacts(project.toolsets)}`,
    `\n### Tasks\n${summarizeArtifacts(project.tasks)}`,
    `\n### Memories\n${summarizeArtifacts(project.memories)}`,
    "",
    "## Guidance",
    "",
    "- Treat `.agents/` as the source of truth.",
    "- Keep this file generated from ACS rather than edited by hand.",
    "- Run `acs compile` after changing source-of-truth files.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeText(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function copyRecursive(sourcePath: string, destinationPath: string): string[] {
  const copied: string[] = [];
  const stats = fs.statSync(sourcePath);

  if (stats.isDirectory()) {
    ensureDir(destinationPath);
    for (const entry of fs.readdirSync(sourcePath)) {
      copied.push(...copyRecursive(path.join(sourcePath, entry), path.join(destinationPath, entry)));
    }
    return copied;
  }

  ensureDir(path.dirname(destinationPath));
  fs.copyFileSync(sourcePath, destinationPath);
  copied.push(destinationPath);
  return copied;
}

export function generateCompanionFiles(project: ACSProject): GeneratedFile[] {
  return VENDOR_TARGETS.map(({ filePath, title }) => ({
    path: filePath,
    content: buildCompanionContent(project, title),
  }));
}

export function compareGeneratedFiles(project: ACSProject): FileComparison[] {
  return generateCompanionFiles(project).map((generated) => {
    const absolute = path.join(project.root, generated.path);
    if (!fs.existsSync(absolute)) {
      return { path: generated.path, status: "added", generated: generated.content };
    }

    const existing = fs.readFileSync(absolute, "utf8");
    return {
      path: generated.path,
      status: existing === generated.content ? "unchanged" : "changed",
      existing,
      generated: generated.content,
    };
  });
}

export function writeGeneratedFiles(project: ACSProject): GeneratedFile[] {
  const files = generateCompanionFiles(project);
  for (const file of files) {
    writeText(path.join(project.root, file.path), file.content);
  }
  return files;
}

export function exportProjectLayer(project: ACSProject, outputDir: string, layer: string): string[] {
  const agentsDir = path.join(project.root, ".agents");
  const targetRoot = path.resolve(outputDir);

  if (layer === "all") {
    return copyRecursive(agentsDir, path.join(targetRoot, ".agents"));
  }

  const source = path.join(agentsDir, layer);
  if (!fs.existsSync(source)) {
    return [];
  }

  const destination = path.join(targetRoot, layer);
  return copyRecursive(source, destination);
}