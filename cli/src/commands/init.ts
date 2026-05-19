import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import prompts from "prompts";
import chalk from "chalk";
import { detectProject } from "../utils/detect";
import {
  writeFile,
  generateMainYaml,
  generateContextMd,
  generateSkillMd,
  generateCommandMd,
  generateAgentMd,
  generateWorkflowMd,
  generateHookMd,
  generateProfileMd,
  generateToolsetYaml,
  generateTaskMd,
  generateMemoryMd,
} from "../utils/scaffold";

export function initCommand(): Command {
  const cmd = new Command("init");
  cmd
    .description("Scaffold a new .agents/ folder in the current project")
    .action(async () => {
      const cwd = process.cwd();
      const agentsDir = path.join(cwd, ".agents");

      if (fs.existsSync(agentsDir)) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: chalk.yellow(".agents/ already exists. Continue anyway?"),
          initial: false,
        });
        if (!overwrite) {
          console.log("Aborted.");
          process.exit(0);
        }
      }

      const detected = detectProject(cwd);

      console.log(
        chalk.dim(
          detected.language
            ? `Detected: ${detected.language}${detected.framework ? ` / ${detected.framework}` : ""}`
            : "No framework detected — you can set it manually."
        )
      );
      console.log("");

      const response = await prompts(
        [
          {
            type: "text",
            name: "name",
            message: "Project name",
            initial: detected.name,
            validate: (v: string) =>
              /^[a-z0-9-]+$/.test(v)
                ? true
                : "Must be lowercase alphanumeric with hyphens",
          },
          {
            type: "text",
            name: "description",
            message: "Project description",
            validate: (v: string) =>
              v.trim().length > 0 ? true : "Description is required",
          },
          {
            type: "text",
            name: "language",
            message: "Primary language",
            initial: detected.language || "",
          },
          {
            type: "text",
            name: "framework",
            message: "Framework (leave blank if none)",
            initial: detected.framework || "",
          },
          {
            type: "multiselect",
            name: "layers",
            message: "Which layers do you want to scaffold?",
            choices: [
              { title: "context", value: "context", selected: true },
              { title: "skills", value: "skills", selected: false },
              { title: "commands", value: "commands", selected: false },
              { title: "agents", value: "agents", selected: false },
              { title: "workflows", value: "workflows", selected: false },
              { title: "hooks", value: "hooks", selected: false },
              { title: "profiles", value: "profiles", selected: false },
              { title: "tools", value: "tools", selected: false },
              { title: "tasks", value: "tasks", selected: false },
              { title: "memories", value: "memories", selected: false },
              { title: "permissions", value: "permissions", selected: false },
            ],
            hint: "Space to select, Enter to confirm",
          },
        ],
        {
          onCancel: () => {
            console.log("Aborted.");
            process.exit(0);
          },
        }
      );

      const layerSet = new Set<string>(response.layers as string[]);
      const layers: Record<string, boolean> = {
        context: layerSet.has("context"),
        skills: layerSet.has("skills"),
        commands: layerSet.has("commands"),
        agents: layerSet.has("agents"),
        workflows: layerSet.has("workflows"),
        hooks: layerSet.has("hooks"),
        profiles: layerSet.has("profiles"),
        tools: layerSet.has("tools"),
        tasks: layerSet.has("tasks"),
        memories: layerSet.has("memories"),
        permissions: layerSet.has("permissions"),
      };

      const created: string[] = [];

      // main.yaml
      const mainYaml = generateMainYaml({
        name: response.name as string,
        description: response.description as string,
        language: (response.language as string) || null,
        framework: (response.framework as string) || null,
        layers,
      });
      writeFile(path.join(agentsDir, "main.yaml"), mainYaml);
      created.push(".agents/main.yaml");

      // context/project.md
      if (layerSet.has("context")) {
        writeFile(
          path.join(agentsDir, "context", "project.md"),
          generateContextMd(response.name as string)
        );
        created.push(".agents/context/project.md");
      }

      // skills/example-skill/SKILL.md
      if (layerSet.has("skills")) {
        writeFile(
          path.join(agentsDir, "skills", "example-skill", "SKILL.md"),
          generateSkillMd("example-skill")
        );
        created.push(".agents/skills/example-skill/SKILL.md");
      }

      // commands/ placeholder
      if (layerSet.has("commands")) {
        writeFile(path.join(agentsDir, "commands", "example-command.md"), generateCommandMd("example-command"));
        created.push(".agents/commands/example-command.md");
      }

      // agents/ placeholder
      if (layerSet.has("agents")) {
        writeFile(path.join(agentsDir, "agents", "reviewer.md"), generateAgentMd("reviewer"));
        created.push(".agents/agents/reviewer.md");
      }

      if (layerSet.has("workflows")) {
        writeFile(path.join(agentsDir, "workflows", "workflow.md"), generateWorkflowMd("workflow"));
        created.push(".agents/workflows/workflow.md");
      }

      if (layerSet.has("hooks")) {
        writeFile(path.join(agentsDir, "hooks", "hook.md"), generateHookMd("hook", "pre-edit"));
        created.push(".agents/hooks/hook.md");
      }

      if (layerSet.has("profiles")) {
        writeFile(path.join(agentsDir, "profiles", "profile.md"), generateProfileMd("profile"));
        created.push(".agents/profiles/profile.md");
      }

      if (layerSet.has("tools")) {
        writeFile(path.join(agentsDir, "tools", "toolset.yaml"), generateToolsetYaml());
        created.push(".agents/tools/toolset.yaml");
      }

      if (layerSet.has("tasks")) {
        writeFile(path.join(agentsDir, "tasks", "task.md"), generateTaskMd("task"));
        created.push(".agents/tasks/task.md");
      }

      if (layerSet.has("memories")) {
        writeFile(path.join(agentsDir, "memories", "memory.md"), generateMemoryMd("memory"));
        created.push(".agents/memories/memory.md");
      }

      // permissions/policy.yaml
      if (layerSet.has("permissions")) {
        writeFile(
          path.join(agentsDir, "permissions", "policy.yaml"),
          `deny:\n  write:\n    - ".env"\n    - ".env.*"\n    - "*.pem"\n    - "*.key"\n`
        );
        created.push(".agents/permissions/policy.yaml");
      }

      console.log("");
      console.log(chalk.green("✓ ACS project initialized!"));
      console.log("");
      for (const f of created) {
        console.log(`  ${chalk.dim("created")}  ${f}`);
      }
      console.log("");
      console.log(
        `Run ${chalk.cyan("acs validate")} to check your configuration.`
      );
    });

  return cmd;
}
