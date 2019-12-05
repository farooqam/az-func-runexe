const path = require('path');
const ExeConfigurationFactory = require('../shared/exe-configuration.factory');
const ProcessRunner = require('../shared/process-runner');

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (!req.body.inputFile || !req.body.outputFile) {
    context.res = {
      status: 400,
      body: 'Please provide an input file and output file in the request body.'
    };

    context.done();
    return;
  }

  const root = path.dirname(context.executionContext.functionDirectory);

  const json = {
    cmd: 'ffmpeg.exe',
    cwd: path.join(root, 'ffmpeg'),
    args: [
      {
        name: '-y',
        value: ''
      },
      {
        name: '-i',
        value: req.body.inputFile
      },
      {
        name: req.body.outputFile,
        value: ''
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
        body: errors
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
