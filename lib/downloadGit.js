const chalk = require('chalk');
const downloadGitRepo = require('download-git-repo');
const ora = require('ora');

module.exports.downloadGit = async (targetDir, url) => {
  const spinner = ora(chalk.bold.cyan('downloading...'));
  spinner.start();
  await downloadGitRepo(
    `direct:${url}`,
    targetDir,
    { clone: true },
    function (err) {
      if (err) {
        spinner.fail(chalk.bold.red('download failed:' + err));
      } else {
        spinner.succeed(chalk.bold.green('download succeed'));
        spinner.stop();
      }
    }
  );
};
