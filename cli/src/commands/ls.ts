import { Command } from "commander";
import * as path from "path";
import chalk from "chalk";
import { findACSRoot, loadProject } from "../utils/project";

export function lsCommand(): Command {
  const cmd = new Command("ls");
  cmd
    .description("List all discovered ACS layers, skills, commands, and agents")
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

      const project = loadProject(start);
      if (!project) {
        console.error(chalk.red("✗ Failed to load project."));
        process.exit(1);
      }

      const {
        manifest,
        skills,
        contextFiles,
        commands,
        agents,
        workflows,
        hooks,
        profiles,
        toolsets,
        tasks,
        memories,
      } = project;

      console.log(
        `${chalk.bold(manifest.project.name)}  ${chalk.dim(`v${manifest.version}`)}`
      );
      console.log(chalk.dim(manifest.project.description));
      if (manifest.project.language || manifest.project.framework) {
        const lang = [manifest.project.language, manifest.project.framework]
          .filter(Boolean)
          .join(" / ");
        console.log(chalk.dim(lang));
      }
      console.log("");

      if (skills.length > 0) {
        console.log(chalk.bold("Skills"));
        for (const s of skills) {
          console.log(`  ${chalk.cyan(s.name)}`);
          if (s.description) {
            console.log(`    ${chalk.dim(s.description)}`);
          }
        }
        console.log("");
      }

      if (commands.length > 0) {
        console.log(chalk.bold("Commands"));
        for (const c of commands) {
          console.log(`  ${chalk.cyan(path.basename(c, ".md"))}`);
        }
        console.log("");
      }

      if (agents.length > 0) {
        console.log(chalk.bold("Agents"));
        for (const a of agents) {
          console.log(`  ${chalk.cyan(path.basename(a, ".md"))}`);
        }
        console.log("");
      }

      if (workflows.length > 0) {
        console.log(chalk.bold("Workflows"));
        for (const workflow of workflows) {
          console.log(`  ${chalk.cyan(workflow.name)}`);
        }
        console.log("");
      }

      if (hooks.length > 0) {
        console.log(chalk.bold("Hooks"));
        for (const hook of hooks) {
          console.log(`  ${chalk.cyan(hook.name)}`);
        }
        console.log("");
      }

      if (profiles.length > 0) {
        console.log(chalk.bold("Profiles"));
        for (const profile of profiles) {
          console.log(`  ${chalk.cyan(profile.name)}`);
        }
        console.log("");
      }

      if (toolsets.length > 0) {
        console.log(chalk.bold("Tools"));
        for (const toolset of toolsets) {
          console.log(`  ${chalk.cyan(toolset.name)}`);
        }
        console.log("");
      }

      if (tasks.length > 0) {
        console.log(chalk.bold("Tasks"));
        for (const task of tasks) {
          console.log(`  ${chalk.cyan(task.name)}`);
        }
        console.log("");
      }

      if (memories.length > 0) {
        console.log(chalk.bold("Memories"));
        for (const memory of memories) {
          console.log(`  ${chalk.cyan(memory.name)}`);
        }
        console.log("");
      }

      if (contextFiles.length > 0) {
        console.log(chalk.bold("Context"));
        for (const c of contextFiles) {
          console.log(`  ${chalk.dim(path.basename(c))}`);
        }
        console.log("");
      }

      if (
        skills.length === 0 &&
        commands.length === 0 &&
        agents.length === 0 &&
        workflows.length === 0 &&
        hooks.length === 0 &&
        profiles.length === 0 &&
        toolsets.length === 0 &&
        tasks.length === 0 &&
        memories.length === 0 &&
        contextFiles.length === 0
      ) {
        console.log(
          chalk.dim("No layers discovered yet. Run acs init to scaffold them.")
        );
      }
    });

  return cmd;
}
