#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.2.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

program.parse();