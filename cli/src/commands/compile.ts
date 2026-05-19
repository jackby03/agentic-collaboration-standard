import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import { findACSRoot, loadProject } from "../utils/project";
import { writeGeneratedFiles } from "../utils/artifacts";

export function compileCommand(): Command {
  const cmd = new Command("compile");
  cmd
    .description("Generate companion files from .agents/")
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

      const files = writeGeneratedFiles(project);
      console.log(chalk.green(`✓ Generated ${files.length} companion files`));
      for (const file of files) {
        console.log(`  ${chalk.dim("written")}  ${file.path}`);
      }
    });

  return cmd;
}