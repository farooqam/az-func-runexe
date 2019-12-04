const fs = require('fs');
const ExeConfiguration = require('./exe-configuration');

class ExeConfigurationFactory {
  create (configFilePath) {
    const json = JSON.parse(fs.readFileSync(configFilePath));
    const exeConfiguration = new ExeConfiguration();
    exeConfiguration.cmd = json.cmd;

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
