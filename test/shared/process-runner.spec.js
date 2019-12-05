/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const ExecConfigurationFactory = require('../../shared/exe-configuration.factory');
const ProcessRunner = require('../../shared/process-runner');

describe('ProcessRunner', () => {
  it('runs the process', async () => {
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
    let exited = false;

    runner.events.on('output', data => { data.length.should.be.above(0); });
    runner.events.on('error', error => { error.length.should.eq(0); });
    runner.events.on('exit', data => { data.should.eq(0); exited = true; });
    runner.run();

    // eslint-disable-next-line no-unmodified-loop-condition
    while (!exited) {
      await sleep(1000);
    }
  });
});

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
