#!/usr/bin/env node

const program = require('commander');

program
  .usage('<command> [options]');
  
program
  .command('new <page-name>')
  .description('create a new Page powered by x-cde')
  .action((name, cmd) => {
    console.log(name)
    require('../lib/create')(name)
  })
  
  program.parse(process.argv); 