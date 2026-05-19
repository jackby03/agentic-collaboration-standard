"use strict";
/**
 * ACS Reference Validator (TypeScript)
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
exports.validateManifest = validateManifest;
exports.validateProject = validateProject;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
function validateManifest(filePath) {
    const errors = [];
    const data = yaml.load(fs.readFileSync(filePath, "utf8"));
    if (!data.version)
        errors.push("Missing required field: version");
    else if (data.version !== "1.0")
        errors.push(`Unknown version: ${data.version}`);
    const project = data.project;
    if (!project) {
        errors.push("Missing required section: project");
    }
    else {
        if (!project.name)
            errors.push("Missing required field: project.name");
        else if (!/^[a-z0-9-]+$/.test(project.name))
            errors.push("project.name must be lowercase alphanumeric with hyphens");
        if (!project.description)
            errors.push("Missing required field: project.description");
        else if (project.description.length > 512)
            errors.push("project.description exceeds 512 characters");
    }
    return errors;
}
function validateProject(root) {
    const result = { errors: [], warnings: [] };
    const manifest = path.join(root, ".agents", "main.yaml");
    if (!fs.existsSync(manifest)) {
        result.errors.push("Missing .agents/main.yaml");
        return result;
    }
    result.errors.push(...validateManifest(manifest));
    return result;
}
