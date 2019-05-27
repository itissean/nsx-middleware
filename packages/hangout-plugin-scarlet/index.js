/**
 * Replace all template string matches with the string manager value.
 * @param {string} template string that can be transformed into RegExp
 * @param {JSON} fields of Hangout data
 * @return {JSON} transformed templates
 */
const replaceTemplates = (template, fields) => {
  const regex = new RegExp(template, 'g');
  const matches = fields.match(regex);

  const transformed = templates.reduce((pipingFields, currentTemplate) => {
    const stringKey = currentTemplate.replace(/\W+/g, '');
    const replacement = StringManager.get(stringKey);

    return pipingFields.replace(currentTemplate, replacement);
  }, fields);

  return JSON.stringify({
    transformed,
  });
};

module.exports = replaceTemplates;