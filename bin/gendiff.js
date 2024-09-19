#!/usr/bin/env node
import { Command } from "commander";
import main from "../index.js";
const program = new Command();

program
  .name("gendiff")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    main(filepath1, filepath2);
  })
  .parse();
