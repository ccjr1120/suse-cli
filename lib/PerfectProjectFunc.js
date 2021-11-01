const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

module.exports.updatePackageName = (targetDir, projectName) => {
  const spinner = ora(chalk.bold.cyan());
  const packDir = path.join(targetDir, 'package.json');
  fs.readFile(packDir, (err, data) => {
    if (err) {
      spinner.fail(
        chalk.bold.red('Failed to update the name in the package.json ' + err)
      );
      return;
    }
    let jsonData = JSON.parse(data.toString());
    jsonData.name = projectName;
    fs.writeFile(packDir, JSON.stringify(jsonData), function (err) {});
  });
};
