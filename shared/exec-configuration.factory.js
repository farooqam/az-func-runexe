const fs = require('fs')
const ExeConfiguration = require('./exe-configuration')

class ExeConfigurationFactory {
  create (configFilePath) {
    const json = JSON.parse(fs.readFileSync(configFilePath))
    const exeConfiguration = new ExeConfiguration()
    exeConfiguration.cmd = json.cmd

    Object.keys(json.args).forEach(key => {
      exeConfiguration.argsDictionary.push({
        key,
        value: json.args[key]
      })
    })

    return exeConfiguration
  }
}

module.exports = ExeConfigurationFactory
