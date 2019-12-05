const spawn = require('cross-spawn');
const EventEmitter = require('events').EventEmitter;

class ProcessRunner {
  constructor (config) {
    this._config = config;
    this.events = new EventEmitter();
  }

  run () {
    const args = [];

    this._config.argsDictionary.forEach(arg => {
      args.push(arg.name);

      if (arg.value.length !== 0) {
        args.push(arg.value);
      }
    });

    const process = spawn(
      this._config.cmd,
      args,
      { cwd: this._config.cwd });

    process.stdout.on('data', data => this.events.emit('output', data.toString()));
    process.stderr.on('data', data => this.events.emit('error', data.toString()));
    process.on('exit', code => console.log(this.events.emit('exit', code)));
  }
}

module.exports = ProcessRunner;
