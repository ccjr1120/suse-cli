#! /usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');

const { printTempleteList } = require('../lib/PrintFunc');
const {
  inputName,
  selectTemplate,
  selectHasOverwrite,
} = require('../lib/InputFunc');
const { downloadGit } = require('../lib/downloadGit');

program
  .version('0.0.1')
  .option('-l --list', 'display template list')
  .parse(process.argv);

const options = program.opts();

if (options.list) {
  printTempleteList(TEMPLATE_LIST);
} else {
  (async () => {
    const cwd = process.cwd();

    const projectName = await inputName();
    const targetDir = path.join(cwd, projectName);

    const templateUrl = await selectTemplate();

    const hasOverwrite = await selectHasOverwrite(targetDir);
    if (hasOverwrite) {
      downloadGit(targetDir, templateUrl);
    }
  })();
}
