/**
 * Tests for ACS reference validator (TypeScript).
 * Run with: cd reference-impl/typescript && npm test
 */

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { validateManifest, validateProject } from "../../reference-impl/typescript/validator";

const FIXTURES = path.join(__dirname, "..", "fixtures");
const VALID_PROJECT = path.join(FIXTURES, "valid-project");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTmpProject(files: Record<string, string>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "acs-test-"));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return dir;
}

// ---------------------------------------------------------------------------
// validateManifest
// ---------------------------------------------------------------------------

describe("validateManifest", () => {
  test("valid manifest has no errors", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  name: "my-app"\n  description: "A valid project"\n',
    });
    expect(validateManifest(path.join(dir, "main.yaml"))).toEqual([]);
  });

  test("missing version produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'project:\n  name: "my-app"\n  description: "desc"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("version"))).toBe(true);
  });

  test("wrong version produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "2.0"\nproject:\n  name: "my-app"\n  description: "desc"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("version"))).toBe(true);
  });

  test("missing project section produces error", () => {
    const dir = makeTmpProject({ "main.yaml": 'version: "1.0"\n' });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("project"))).toBe(true);
  });

  test("missing project.name produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  description: "desc"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("project.name"))).toBe(true);
  });

  test("uppercase project.name produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  name: "MyApp"\n  description: "desc"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("project.name"))).toBe(true);
  });

  test("project.name with spaces produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  name: "my app"\n  description: "desc"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("project.name"))).toBe(true);
  });

  test("project.name with hyphens is valid", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  name: "my-app-123"\n  description: "desc"\n',
    });
    expect(validateManifest(path.join(dir, "main.yaml"))).toEqual([]);
  });

  test("missing project.description produces error", () => {
    const dir = makeTmpProject({
      "main.yaml": 'version: "1.0"\nproject:\n  name: "my-app"\n',
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("project.description"))).toBe(true);
  });

  test("description over 512 chars produces error", () => {
    const longDesc = "x".repeat(513);
    const dir = makeTmpProject({
      "main.yaml": `version: "1.0"\nproject:\n  name: "my-app"\n  description: "${longDesc}"\n`,
    });
    const errors = validateManifest(path.join(dir, "main.yaml"));
    expect(errors.some((e) => e.includes("512"))).toBe(true);
  });

  test("description exactly 512 chars is valid", () => {
    const desc = "x".repeat(512);
    const dir = makeTmpProject({
      "main.yaml": `version: "1.0"\nproject:\n  name: "my-app"\n  description: "${desc}"\n`,
    });
    expect(validateManifest(path.join(dir, "main.yaml"))).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// validateProject
// ---------------------------------------------------------------------------

describe("validateProject", () => {
  test("valid fixture project has no errors", () => {
    const result = validateProject(VALID_PROJECT);
    expect(result.errors).toEqual([]);
  });

  test("missing main.yaml produces error", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "acs-test-"));
    const result = validateProject(dir);
    expect(result.errors.some((e) => e.includes("main.yaml"))).toBe(true);
  });
});
