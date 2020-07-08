#!/usr/bin/env node

const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');

const log = str => shell.echo('-e', chalk.greenBright.bold(str));

// 命令行问答
inquirer
    .prompt([
        {
            type: 'list',
            name: 'version',
            message: '请选择更新版本?',
            choices: [
                'patch',
                'minor',
                'major',
            ]
        },
    ])
    .then(answers => {
        // 更新版本号
        const v = shell.exec(`npm version ${answers.version}`, { silent: true}).stdout;
        log(v);

        // 执行打包
        const lib = ora('开始构建 lib 包').start();
        shell.exec('npm run lib', { silent: true });
        lib.succeed('lib 包构建完成');
        log('\r');

        // 执行组件打包
        const component = ora('开始构建 component 包').start();
        shell.exec('npm run component', { silent: true });
        component.succeed('component 包构建完成');
        log('\r');


        // npm 发布
        const publish = ora('开始发布组件库').start();
        shell.exec('npm publish', { silent: false });
        publish.succeed('组件库发布完成');
        log('\r');

        // 输出提示信息
        log(`请合并 [ ${v.replace(/v|\n|\r/g, '')} ] 的提交记录`);
        log('\r');
        log('并执行 [ git push --tags ] 推送标签');
    });
