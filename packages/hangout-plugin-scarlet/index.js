/**
 * Replace all template string matches with the string manager value.
 * @param {string} template string that can be transformed into RegExp
 * @param {JSON} fields of Hangout data
 * @return {JSON} transformed templates
 */
const replaceTemplates = (template, fields) => {
  const regex = new RegExp(template, 'g');
  const matches = fields.match(regex);

  const transformed = templates.reduce((prev, curr) => {
    const stringKey = curr.replace(/\W+/g, '');
    const replacement = StringManager.get(stringKey);

    return prev.replace(curr, replacement);
  }, fields);

  return JSON.stringify({
    transformed,
  });
};

module.exports = replaceTemplates;