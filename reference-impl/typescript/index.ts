/**
 * @acs/validator — Public API
 * ACS v1.0 reference parser and validator (TypeScript)
 */

export { findACSRoot, parseManifest, discoverSkills, loadProject } from "./parser";
export type { ACSManifest, ACSSkill, ACSProject } from "./parser";

export { validateManifest, validateProject } from "./validator";
export type { ValidationResult } from "./validator";
