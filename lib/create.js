const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const shell = require('shelljs');
const inquirer = require('inquirer');
const nunjucks = require('nunjucks');

const util = require('../util');

async function create(pageName) {
  
  if (!pageName) {
    console.log(chalk.red('请提供页面名，如 SupplyHome' ));
    return;
  }

  // 页面文件夹首字母大写
  pageName = util.fistLetterUpper(pageName);

  const targetDir = path.resolve(pageName);
  const indexTpl = path.resolve(__dirname, '../tpl/index.js');
  const styleTpl = path.resolve(__dirname, '../tpl/style.js');

  if (fs.existsSync(targetDir)) {
    const {ok} = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `目录 ${chalk.cyan(targetDir)} 已经存在, \n 继续在${chalk.cyan(targetDir)}目录下创建文件并覆盖当前目录？`
      }
    ]);

    if (!ok) 
      return;
    }
  else {
    rimraf.sync(targetDir);
    fs.mkdirSync(pageName);
  }

  const  indexFile = fs.readFileSync(indexTpl).toString();

  var compiledData = nunjucks.renderString(indexFile, { pageName });

  fs.writeFileSync( targetDir + '/index.js', compiledData);
  shell.cp('-R', styleTpl, targetDir);

  console.log(chalk.green(
    `已生成 ${targetDir}/index.js \n` +
    `已生成 ${targetDir}/style.js  `
  ));
}

module.exports = create;