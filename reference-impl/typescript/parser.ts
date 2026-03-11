/**
 * ACS Reference Parser (TypeScript)
 * Discovers and parses .agents/ folder structure.
 */

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

interface ACSManifest {
  version: string;
  project: { name: string; description: string; language?: string; framework?: string };
  layers?: Record<string, boolean>;
  compatible_with?: string[];
}

interface ACSSkill {
  name: string;
  description: string;
  location: string;
}

interface ACSProject {
  root: string;
  manifest: ACSManifest;
  skills: ACSSkill[];
  contextFiles: string[];
  commands: string[];
  agents: string[];
}

export function findACSRoot(start: string = process.cwd()): string | null {
  let current = path.resolve(start);
  while (true) {
    const candidate = path.join(current, ".agents", "main.yaml");
    if (fs.existsSync(candidate)) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function parseManifest(root: string): ACSManifest {
  const content = fs.readFileSync(path.join(root, ".agents", "main.yaml"), "utf8");
  return yaml.load(content) as ACSManifest;
}

export function discoverSkills(root: string): ACSSkill[] {
  const skillsDir = path.join(root, ".agents", "skills");
  if (!fs.existsSync(skillsDir)) return [];
  const skills: ACSSkill[] = [];
  for (const dir of fs.readdirSync(skillsDir)) {
    const skillMd = path.join(skillsDir, dir, "SKILL.md");
    if (fs.existsSync(skillMd)) {
      const content = fs.readFileSync(skillMd, "utf8");
      if (content.startsWith("---")) {
        const parts = content.split("---");
        if (parts.length >= 3) {
          const fm = yaml.load(parts[1]) as Record<string, string>;
          skills.push({ name: fm.name || dir, description: fm.description || "", location: skillMd });
        }
      }
    }
  }
  return skills;
}

export function loadProject(start?: string): ACSProject | null {
  const root = findACSRoot(start);
  if (!root) return null;
  const manifest = parseManifest(root);
  const skills = discoverSkills(root);
  const agentsDir = path.join(root, ".agents");
  const glob = (dir: string) => {
    const full = path.join(agentsDir, dir);
    return fs.existsSync(full) ? fs.readdirSync(full).filter(f => f.endsWith(".md")).map(f => path.join(full, f)) : [];
  };
  return { root, manifest, skills, contextFiles: glob("context"), commands: glob("commands"), agents: glob("agents") };
}
