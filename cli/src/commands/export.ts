import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { findACSRoot, loadProject } from "../utils/project";
import { exportProjectLayer } from "../utils/artifacts";

export function exportCommand(): Command {
  const cmd = new Command("export");
  cmd
    .description("Export .agents/ or a specific layer to a standalone directory")
    .option("-p, --path <dir>", "Path to project root (default: cwd)")
    .option("-o, --output <dir>", "Output directory", "./exported-agents")
    .option("-l, --layer <layer>", "Layer to export", "all")
    .action((opts: { path?: string; output: string; layer: string }) => {
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

      const outputDir = path.resolve(opts.output);
      fs.mkdirSync(outputDir, { recursive: true });
      const copied = exportProjectLayer(project, outputDir, opts.layer);

      if (copied.length === 0) {
        console.log(chalk.yellow(`No files found for layer ${opts.layer}.`));
        return;
      }

      console.log(chalk.green(`✓ Exported ${copied.length} files to ${outputDir}`));
      for (const filePath of copied) {
        console.log(`  ${chalk.dim("copied")}  ${path.relative(outputDir, filePath)}`);
      }
    });

  return cmd;
}