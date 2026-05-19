import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

export interface ACSManifest {
  version: string;
  project: { name: string; description: string; language?: string; framework?: string };
  layers?: Record<string, boolean>;
  compatible_with?: string[];
}

export interface ACSSkill {
  name: string;
  description: string;
  location: string;
}

export interface ACSArtifact {
  name: string;
  description: string;
  location: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

export interface ACSWorkflow extends ACSArtifact {
  trigger: string;
  steps: string[];
}

export interface ACSHook extends ACSArtifact {
  hookPoint: string;
}

export interface ACSProfile extends ACSArtifact {
  extends?: string;
}

export interface ACSToolset {
  name: string;
  description: string;
  location: string;
  data: Record<string, unknown>;
}

export interface ACSTask extends ACSArtifact {}

export interface ACSMemory extends ACSArtifact {}

export interface ACSProject {
  root: string;
  manifest: ACSManifest;
  skills: ACSSkill[];
  contextFiles: string[];
  commands: string[];
  agents: string[];
  workflows: ACSWorkflow[];
  hooks: ACSHook[];
  profiles: ACSProfile[];
  toolsets: ACSToolset[];
  tasks: ACSTask[];
  memories: ACSMemory[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function walkFiles(dir: string, predicate: (filePath: string) => boolean): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, predicate));
      continue;
    }

    if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function parseFrontmatter(filePath: string): { frontmatter: Record<string, unknown>; body: string } {
  const content = readText(filePath);
  const lines = content.split(/\r?\n/);

  if (lines[0]?.trim() !== "---") {
    return { frontmatter: {}, body: content };
  }

  let endIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      endIndex = index;
      break;
    }
  }

  if (endIndex === -1) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterContent = lines.slice(1, endIndex).join("\n");
  const body = lines.slice(endIndex + 1).join("\n");
  const parsed = yaml.load(frontmatterContent);

  return {
    frontmatter: isRecord(parsed) ? parsed : {},
    body,
  };
}

function artifactFromMarkdown(filePath: string): ACSArtifact {
  const { frontmatter, body } = parseFrontmatter(filePath);
  const name = typeof frontmatter.name === "string" && frontmatter.name.trim().length > 0
    ? frontmatter.name
    : path.basename(path.dirname(filePath));
  const description = typeof frontmatter.description === "string" ? frontmatter.description : "";

  return { name, description, location: filePath, frontmatter, body };
}

function discoverMarkdownArtifacts(root: string, subdir: string, filename: string): ACSArtifact[] {
  const baseDir = path.join(root, ".agents", subdir);
  const files = walkFiles(baseDir, (filePath) => path.basename(filePath) === filename);
  return files.map(artifactFromMarkdown);
}

function discoverDocuments(root: string, subdir: string): string[] {
  const baseDir = path.join(root, ".agents", subdir);
  return walkFiles(baseDir, (filePath) => path.extname(filePath) === ".md");
}

function discoverYamlArtifacts(root: string, subdir: string): ACSToolset[] {
  const baseDir = path.join(root, ".agents", subdir);
  const files = walkFiles(baseDir, (filePath) => [".yaml", ".yml"].includes(path.extname(filePath)));

  return files.map((filePath) => {
    const parsed = yaml.load(readText(filePath));
    const data = isRecord(parsed) ? parsed : {};
    const name = typeof data.name === "string" && data.name.trim().length > 0
      ? data.name
      : path.basename(filePath, path.extname(filePath));
    const description = typeof data.description === "string" ? data.description : "";

    return { name, description, location: filePath, data };
  });
}

export function findACSRoot(start: string = process.cwd()): string | null {
  let current = path.resolve(start);
  while (true) {
    const candidate = path.join(current, ".agents", "main.yaml");
    if (fs.existsSync(candidate)) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return null;
    }

    current = parent;
  }
}

export function parseManifest(root: string): ACSManifest {
  const content = readText(path.join(root, ".agents", "main.yaml"));
  return yaml.load(content) as ACSManifest;
}

export function discoverSkills(root: string): ACSSkill[] {
  const skillFiles = walkFiles(path.join(root, ".agents", "skills"), (filePath) => path.basename(filePath) === "SKILL.md");
  return skillFiles.map((skillMd) => {
    const { frontmatter } = parseFrontmatter(skillMd);
    const name = typeof frontmatter.name === "string" && frontmatter.name.trim().length > 0
      ? frontmatter.name
      : path.basename(path.dirname(skillMd));
    const description = typeof frontmatter.description === "string" ? frontmatter.description : "";
    return { name, description, location: skillMd };
  });
}

export function loadProject(start?: string): ACSProject | null {
  const root = findACSRoot(start);
  if (!root) {
    return null;
  }

  const manifest = parseManifest(root);

  return {
    root,
    manifest,
    skills: discoverSkills(root),
    contextFiles: discoverDocuments(root, "context"),
    commands: discoverDocuments(root, "commands"),
    agents: discoverDocuments(root, "agents"),
    workflows: discoverMarkdownArtifacts(root, "workflows", "workflow.md") as ACSWorkflow[],
    hooks: discoverMarkdownArtifacts(root, "hooks", "hook.md") as ACSHook[],
    profiles: discoverMarkdownArtifacts(root, "profiles", "profile.md") as ACSProfile[],
    toolsets: discoverYamlArtifacts(root, "tools"),
    tasks: discoverMarkdownArtifacts(root, "tasks", "task.md") as ACSTask[],
    memories: discoverMarkdownArtifacts(root, "memories", "memory.md") as ACSMemory[],
  };
}
