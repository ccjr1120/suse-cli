const chalk = require('chalk');

const TEMPLATE_LIST = require('../data/template_list.json');

module.exports.printTempleteList = () => {
  const str = TEMPLATE_LIST.reduce(
    (pre, curr, i) =>
      `${pre}${i + 1}:${chalk.bold.green(
        curr.Name
      )} ${chalk.underline.italic.red(curr.URL)}\n`,
    ''
  );
  console.log(str.substr(0, str.length - 1));
};
