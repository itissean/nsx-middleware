const expect = require('chai').expect;
const { stub } = require('sinon');
const request = require('request-promise-native');

const replaceTemplates = require('./');

const regex = new RegExp(/[%{](.\w+)}/g);

const fields = {
  navigation: {
    cta: '%{alfa}',
  },
  masthead: {
    cta: '%{alfa}',
  },
};

const key = 'able';

const transformed = {
  navigation: {
    cta: 'able',
  },
  masthead: {
    cta: 'able',
  },
};

describe('replaceTemplate', async () => {
  it('should replace 1 template 2 times', async () => {
    stub(request, 'get').resolves(key);
    expect(await replaceTemplates(regex, fields)).to.deep.equal(transformed);
  });
});