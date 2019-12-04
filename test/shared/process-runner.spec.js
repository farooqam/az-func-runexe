/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const ExecConfiguration = require('../../shared/exe-configuration');
const ProcessRunner = require('../../shared/process-runner');

describe('ProcessRunner', () => {
  it('runs the process', () => {
    const config = new ExecConfiguration();
    config.cmd = 'ls';
    config.cwd = __dirname;
    config.argsDictionary.push('-l');
    config.argsDictionary.push('-c');

    const runner = new ProcessRunner(config);
    runner.run();
  });
});
