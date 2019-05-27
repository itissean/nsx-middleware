const request = require('request-promise-native');

/**
 * Replace all template string matches with the string manager value.
 * @param {RegExp} regex template
 * @param {Object} fields of Hangout data
 * @return {Object} transformed templates
 */
const replaceTemplates = async (regex, fields) => {
  const transformed = JSON.stringify(fields);
  const templates = [...new Set(transformed.match(regex))];

  const stringManager = await Promise.all(templates.map(async template => {
    const key = template.replace(/[^\w]+/g, '');
    const value = await request.get(`https://some.url.com/api/${key}`);

    return {
      key: template,
      value,
    };
  }));

  const result = stringManager.reduce((acc, currGroup) =>
    acc.replace(new RegExp(currGroup.key, 'g'), currGroup.value), transformed);

  return JSON.parse(result);
};

module.exports = replaceTemplates;