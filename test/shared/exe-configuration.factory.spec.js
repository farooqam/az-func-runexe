/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const ExeConfigurationFactory = require('../../shared/exe-configuration.factory');

describe('ExeConfigurationFactory', () => {
  let factory;

  before(() => {
    factory = new ExeConfigurationFactory();
  });

  it('creates the config', () => {
    const json = {
      cmd: 'ls',
      cwd: __dirname,
      args: [
        {
          name: '-l',
          value: ''
        },
        {
          name: '-c',
          value: ''
        }
      ]
    };

    const config = factory.create(json);

    config.cmd.should.eq(json.cmd);
    config.cwd.should.eq(json.cwd);

    config.argsDictionary[0].should.deep.equal(json.args[0]);
    config.argsDictionary[1].should.deep.equal(json.args[1]);
  });
});
