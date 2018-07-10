const inArray = require('../lib/inArray');
const upper = require('../lib/upper');
const transformResponses = require('./pathResponses');
const transformParameters = require('./pathParameters');
const security = require('./security');

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

let hasBeenAdded = [];

module.exports = (path, data, parameters) => {
  const res = [];
  let pathParameters = null;

  if (path && data) {
    const title = upper(path.split('/')[2]);
    if (!(inArray(title, hasBeenAdded))){
      res.push(`## ${title}`);
      hasBeenAdded.push(title);
    } 

    let endpointName = path.split('/')[3];

    // Make path as a header
    res.push(`### ${endpointName}`);
    res.push('---');

    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters;
    }

    // Go further method by methods
    Object.keys(data).map(method => {
      if (inArray(method, ALLOWED_METHODS)) {
        // Set method as a subheader
        res.push(`**Method Type:** ${method.toUpperCase()}\n`);
        const pathInfo = data[method];

        // Set summary
        if ('summary' in pathInfo) {
          res.push(`**Endpoint URL:** ${path}\n`);
        }

        // Set description
        if ('description' in pathInfo) {
          res.push(`**Description:** ${pathInfo.description}\n`);
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(`${transformParameters(pathInfo.parameters, pathParameters, parameters)}\n`);
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(`${transformResponses(pathInfo.responses)}\n`);
        }

        // Build security
        if ('security' in pathInfo) {
          res.push(`${security(pathInfo.security)}\n`);
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};
