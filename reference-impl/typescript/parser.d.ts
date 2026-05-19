/**
 * ACS Reference Parser (TypeScript)
 * Discovers and parses .agents/ folder structure.
 */
export interface ACSManifest {
    version: string;
    project: {
        name: string;
        description: string;
        language?: string;
        framework?: string;
    };
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
export interface ACSTask extends ACSArtifact {
}
export interface ACSMemory extends ACSArtifact {
}
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
export declare function findACSRoot(start?: string): string | null;
export declare function parseManifest(root: string): ACSManifest;
export declare function discoverSkills(root: string): ACSSkill[];
export declare function loadProject(start?: string): ACSProject | null;
export declare function parseMarkdownArtifact(filePath: string): ACSArtifact;
export declare function listMarkdownArtifacts(root: string, subdir: string, filename: string): ACSArtifact[];
export declare function listDocuments(root: string, subdir: string): string[];
export declare function listYamlArtifacts(root: string, subdir: string): ACSToolset[];
