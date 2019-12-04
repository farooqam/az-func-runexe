const spawn = require('child_process').spawn;
const path = require('path');

class ProcessRunner {
  constructor (config) {
    this._config = config;
  }

  run () {
    const args = [];

    this._config.argsDictionary.forEach(arg => {
      args.push(arg.key);
      args.push(arg.value);
    });

    const process = spawn(
      path.join(this.config.cwd, this._config.cmd),
      args);

    process.stdout.pipe(process.stdout);
  }
}

module.exports = ProcessRunner;
