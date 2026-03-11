/**
 * ACS Reference Validator (TypeScript)
 */

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export function validateManifest(filePath: string): string[] {
  const errors: string[] = [];
  const data = yaml.load(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
  if (!data.version) errors.push("Missing required field: version");
  else if (data.version !== "1.0") errors.push(`Unknown version: ${data.version}`);
  const project = data.project as Record<string, string> | undefined;
  if (!project) { errors.push("Missing required section: project"); }
  else {
    if (!project.name) errors.push("Missing required field: project.name");
    else if (!/^[a-z0-9-]+$/.test(project.name)) errors.push("project.name must be lowercase alphanumeric with hyphens");
    if (!project.description) errors.push("Missing required field: project.description");
    else if (project.description.length > 512) errors.push("project.description exceeds 512 characters");
  }
  return errors;
}

export function validateProject(root: string): ValidationResult {
  const result: ValidationResult = { errors: [], warnings: [] };
  const manifest = path.join(root, ".agents", "main.yaml");
  if (!fs.existsSync(manifest)) { result.errors.push("Missing .agents/main.yaml"); return result; }
  result.errors.push(...validateManifest(manifest));
  return result;
}
