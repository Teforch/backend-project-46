#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>, <filepath2>', 'filenames', '')
  .action((filename1, filename2, keys) => {
    // console.log(genDiff(filename1, filename2, keys.format));
    genDiff(filename1, filename2, keys.format);
  })
  .parse();
