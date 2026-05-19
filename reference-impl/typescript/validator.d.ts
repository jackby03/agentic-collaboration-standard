/**
 * ACS Reference Validator (TypeScript)
 */
export interface ValidationResult {
    errors: string[];
    warnings: string[];
}
export declare function validateManifest(filePath: string): string[];
export declare function validateProject(root: string): ValidationResult;
