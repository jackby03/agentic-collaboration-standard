import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import { findACSRoot } from "../../../reference-impl/typescript/parser";
import { validateProject } from "../../../reference-impl/typescript/validator";

export function validateCommand(): Command {
  const cmd = new Command("validate");
  cmd
    .description("Validate all ACS files in the current project")
    .option("-p, --path <dir>", "Path to project root (default: cwd)")
    .action((opts: { path?: string }) => {
      const start = opts.path ? path.resolve(opts.path) : process.cwd();
      const root = findACSRoot(start);

      if (!root) {
        console.error(
          chalk.red("✗ No .agents/main.yaml found in this directory or any parent.")
        );
        process.exit(1);
      }

      console.log(chalk.dim(`Validating: ${root}`));
      const result = validateProject(root);

      if (result.errors.length === 0) {
        console.log(chalk.green("✓ ACS project is valid."));
        process.exit(0);
      } else {
        console.log(chalk.red(`✗ Found ${result.errors.length} error(s):\n`));
        for (const err of result.errors) {
          console.log(`  ${chalk.red("•")} ${err}`);
        }
        process.exit(1);
      }
    });

  return cmd;
}
