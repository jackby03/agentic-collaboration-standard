import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import { findACSRoot, loadProject } from "../utils/project";
import { compareGeneratedFiles } from "../utils/artifacts";

export function diffCommand(): Command {
  const cmd = new Command("diff");
  cmd
    .description("Show differences between generated files and the current workspace")
    .option("-p, --path <dir>", "Path to project root (default: cwd)")
    .action((opts: { path?: string }) => {
      const start = opts.path ? path.resolve(opts.path) : process.cwd();
      const root = findACSRoot(start);

      if (!root) {
        console.error(chalk.red("✗ No .agents/main.yaml found in this directory or any parent."));
        process.exit(1);
      }

      const project = loadProject(start);
      if (!project) {
        console.error(chalk.red("✗ Failed to load project."));
        process.exit(1);
      }

      const comparisons = compareGeneratedFiles(project);
      const pending = comparisons.filter((comparison) => comparison.status !== "unchanged");

      if (pending.length === 0) {
        console.log(chalk.green("✓ Generated files are up to date"));
        return;
      }

      for (const comparison of pending) {
        const label = comparison.status === "added" ? chalk.yellow("added") : chalk.cyan("changed");
        console.log(`${label}  ${comparison.path}`);
      }

      process.exitCode = 1;
    });

  return cmd;
}