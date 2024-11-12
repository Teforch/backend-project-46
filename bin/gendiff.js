#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.3')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2, opt) => console.log(genDiff(filepath1, filepath2, opt.format)));

program.parse();
