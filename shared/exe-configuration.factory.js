const ExeConfiguration = require('./exe-configuration');

class ExeConfigurationFactory {
  create (json) {
    const exeConfiguration = new ExeConfiguration();
    exeConfiguration.cmd = json.cmd;
    exeConfiguration.cwd = json.cwd;

    json.args.forEach(arg => {
      exeConfiguration.argsDictionary.push(
        {
          name: arg.name,
          value: arg.value
        });
    });

    return exeConfiguration;
  }
}

module.exports = ExeConfigurationFactory;
