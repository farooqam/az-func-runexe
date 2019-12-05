const path = require('path');
const ExeConfigurationFactory = require('../shared/exe-configuration.factory');
const ProcessRunner = require('../shared/process-runner');

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (!req.query.name || req.query.name !== 'list') {
    context.res = {
      status: 400,
      body: 'Invalid command. Valid commands are [list]'
    };

    context.done();
    return;
  }

  const root = path.dirname(context.executionContext.functionDirectory);

  const json = {
    cmd: 'npm',
    cwd: root,
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

  const exeConfigurationFactory = new ExeConfigurationFactory();
  const config = exeConfigurationFactory.create(json);

  context.log(config);

  const runner = new ProcessRunner(config);
  const output = [];
  const errors = [];

  runner.events.on('output', data => {
    context.log(data);
    output.push(data);
  });

  runner.events.on('error', error => {
    context.log(error);
    errors.push(error);
  });

  runner.events.on('exit', code => {
    if (code === 0) {
      context.res = {
        status: 202,
        body: output
      };
    } else {
      context.res = {
        status: 500,
        body: errors
      };
    }
    context.done();
  });

  runner.run();
};
