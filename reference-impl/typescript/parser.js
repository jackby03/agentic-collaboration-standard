"use strict";
/**
 * ACS Reference Parser (TypeScript)
 * Discovers and parses .agents/ folder structure.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.findACSRoot = findACSRoot;
exports.parseManifest = parseManifest;
exports.discoverSkills = discoverSkills;
exports.loadProject = loadProject;
exports.parseMarkdownArtifact = parseMarkdownArtifact;
exports.listMarkdownArtifacts = listMarkdownArtifacts;
exports.listDocuments = listDocuments;
exports.listYamlArtifacts = listYamlArtifacts;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readText(filePath) {
    return fs.readFileSync(filePath, "utf8");
}
function walkFiles(dir, predicate) {
    if (!fs.existsSync(dir))
        return [];
    const results = [];
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
function parseFrontmatter(filePath) {
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
function artifactFromMarkdown(filePath) {
    const { frontmatter, body } = parseFrontmatter(filePath);
    const name = typeof frontmatter.name === "string" && frontmatter.name.trim().length > 0
        ? frontmatter.name
        : path.basename(path.dirname(filePath));
    const description = typeof frontmatter.description === "string" ? frontmatter.description : "";
    return { name, description, location: filePath, frontmatter, body };
}
function discoverMarkdownArtifacts(root, subdir, filename) {
    const baseDir = path.join(root, ".agents", subdir);
    const files = walkFiles(baseDir, (filePath) => path.basename(filePath) === filename);
    return files.map(artifactFromMarkdown);
}
function discoverDocuments(root, subdir) {
    const baseDir = path.join(root, ".agents", subdir);
    return walkFiles(baseDir, (filePath) => path.extname(filePath) === ".md");
}
function discoverYamlArtifacts(root, subdir) {
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
function findACSRoot(start = process.cwd()) {
    let current = path.resolve(start);
    while (true) {
        const candidate = path.join(current, ".agents", "main.yaml");
        if (fs.existsSync(candidate))
            return current;
        const parent = path.dirname(current);
        if (parent === current)
            return null;
        current = parent;
    }
}
function parseManifest(root) {
    const content = readText(path.join(root, ".agents", "main.yaml"));
    return yaml.load(content);
}
function discoverSkills(root) {
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
function loadProject(start) {
    const root = findACSRoot(start);
    if (!root)
        return null;
    const manifest = parseManifest(root);
    const skills = discoverSkills(root);
    return {
        root,
        manifest,
        skills,
        contextFiles: discoverDocuments(root, "context"),
        commands: discoverDocuments(root, "commands"),
        agents: discoverDocuments(root, "agents"),
        workflows: discoverMarkdownArtifacts(root, "workflows", "workflow.md"),
        hooks: discoverMarkdownArtifacts(root, "hooks", "hook.md"),
        profiles: discoverMarkdownArtifacts(root, "profiles", "profile.md"),
        toolsets: discoverYamlArtifacts(root, "tools"),
        tasks: discoverMarkdownArtifacts(root, "tasks", "task.md"),
        memories: discoverMarkdownArtifacts(root, "memories", "memory.md"),
    };
}
function parseMarkdownArtifact(filePath) {
    return artifactFromMarkdown(filePath);
}
function listMarkdownArtifacts(root, subdir, filename) {
    return discoverMarkdownArtifacts(root, subdir, filename);
}
function listDocuments(root, subdir) {
    return discoverDocuments(root, subdir);
}
function listYamlArtifacts(root, subdir) {
    return discoverYamlArtifacts(root, subdir);
}
