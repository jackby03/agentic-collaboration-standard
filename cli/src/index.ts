#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { validateCommand } from "./commands/validate";
import { lsCommand } from "./commands/ls";

const program = new Command();

program
  .name("acs")
  .description("CLI for the Agentic Collaboration Standard")
  .version("1.0.0");

program.addCommand(initCommand());
program.addCommand(validateCommand());
program.addCommand(lsCommand());

program.parse(process.argv);
