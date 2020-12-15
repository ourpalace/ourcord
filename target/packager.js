"use strict";
// This does not yet work
const chalk = require('chalk');
const inquirer = require('inquirer');
const { version } = require('typescript');
const pckg = require('./package.json');
console.log(chalk.yellow('The current package version is', chalk.yellow.bold(pckg.version)));
const questions = [
    {
        type: 'list',
        name: 'release',
        message: 'What type of release is this:',
        choices: ['Patch', 'Minor', 'Major'],
        filter: function (val) {
            return val.toLowerCase();
        },
    },
];
inquirer.prompt(questions).then((answers) => {
    const jsonAnswers = JSON.stringify(answers, null, '  ');
    switch (jsonAnswers.release) {
        case 'minor':
            version = parseInt(pckg.version) + 0.1;
            console.log(version);
            break;
        case 'patch':
            version = Number(pckg.version) + 0.01;
            console.log(version);
            break;
        case 'major':
            version = parseInt(pckg.version) + 1;
            console.log(version);
            break;
    }
    console.log(chalk.green('Upgraded the package verion to', chalk.green.bold(version)));
});
