/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const path = require('path');
const ExeConfigurationFactory = require('../../shared/exe-configuration.factory');

describe('ExeConfigurationFactory', () => {
  let factory;

  before(() => {
    factory = new ExeConfigurationFactory();
  });

  it('creates the config', () => {
    const configFilePath = path.join(__dirname, 'config.json');
    const config = factory.create(configFilePath);

    config.cmd.should.eq('foo.exe');

    config.argsDictionary[0].should.deep.equal({
      name: 'input',
      value: 'c:\\tmp\\foo.txt'
    });

    config.argsDictionary[1].should.deep.equal({
      name: 'output',
      value: 'c:\\tmp\\foo.out'
    });
  });
});
