#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const TEMPLATE_LIST = require('../data/template_list.json');

program
  .version('0.0.1')
  .option('-l --list', 'display template list')
  .parse(process.argv);

const options = program.opts();
if (options.list) {
  console.table(TEMPLATE_LIST);
}
