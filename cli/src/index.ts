#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { validateCommand } from "./commands/validate";
import { lsCommand } from "./commands/ls";
import { compileCommand } from "./commands/compile";
import { diffCommand } from "./commands/diff";
import { exportCommand } from "./commands/export";

const program = new Command();

program
  .name("acs")
  .description("CLI for the Agentic Collaboration Standard")
  .version("1.0.0");

program.addCommand(initCommand());
program.addCommand(validateCommand());
program.addCommand(lsCommand());
program.addCommand(compileCommand());
program.addCommand(diffCommand());
program.addCommand(exportCommand());

program.parse(process.argv);
