/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const ExecConfigurationFactory = require('../../shared/exe-configuration.factory');
const ProcessRunner = require('../../shared/process-runner');

describe('ProcessRunner', () => {
  it('runs the process', () => {
    const factory = new ExecConfigurationFactory();

    const json = {
      cmd: 'npm',
      cwd: __dirname,
      args: [
        {
          name: 'list',
          value: ''
        },
        {
          name: '-g',
          value: ''
        },
        {
          name: '-depth',
          value: '0'
        }
      ]
    };

    const config = factory.create(json);
    const runner = new ProcessRunner(config);
    runner.run();
  });
});
