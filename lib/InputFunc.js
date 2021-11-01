const TEMPLATE_LIST = require('../data/template_list.json');

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const ora = require('ora');

module.exports.inputName = async function () {
  let name = '';
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'templateName',
        message: chalk.bold.cyan('Please input project name:'),
        default: 'my-test-project',
      },
    ])
    .then((answers) => {
      name = answers.templateName;
    });
  return name;
};

module.exports.selectTemplate = async function () {
  let { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: chalk.bold.cyan('Choose Project Template:'),
      choices: TEMPLATE_LIST.map((item) => ({
        name: chalk.hex('#3396DD').bold(item.Name),
        value: item.URL,
      })),
    },
  ]);
  return action;
};

module.exports.selectHasOverwrite = async function (targetDir) {
  let hasOverwrite = true;
  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: chalk.bold.cyan(
          'Target directory already exists, Pick an action:'
        ),
        choices: [
          {
            name: 'Overwrite',
            value: true,
          },
          {
            name: 'Cancel',
            value: false,
          },
        ],
      },
    ]);
    hasOverwrite = action;
    if (action) {
      const spinner = ora(chalk.bold.cyan('removing...\n'));
      spinner.start();
      fs.remove(targetDir)
        .then(() => {
          spinner.succeed(chalk.bold.green('remove file succeed'));
          spinner.stop();
        })
        .catch((err) => {
          spinner.fail(chalk.bold.red('remove failed ' + err));
        });
    } else {
      console.log(chalk.red.bold('create cancelled'));
    }
  }
  return hasOverwrite;
};
