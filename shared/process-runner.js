const spawn = require('cross-spawn');
// const path = require('path');

class ProcessRunner {
  constructor (config) {
    this._config = config;
  }

  run () {
    const args = [];

    this._config.argsDictionary.forEach(arg => {
      args.push(arg.name);

      if (arg.value.length !== 0) {
        args.push(arg.value);
      }
    });

    console.log(args);
    const process = spawn(
      this._config.cmd,
      args,
      { cwd: this._config.cwd });

    process.stdout.on('data', data => console.log(data.toString()));
    process.stderr.on('data', data => console.error(data.toString()));
    process.on('exit', code => console.log(code));
  }
}

module.exports = ProcessRunner;
