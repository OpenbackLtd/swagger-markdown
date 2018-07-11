const anchor = require('../lib/anchor');

const resolver = {
  integer: {
    int32: 'integer',
    int64: 'long'
  },
  number: {
    float: 'float',
    double: 'double'
  },
  string: {
    byte: 'byte',
    binary: 'binary',
    date: 'date',
    'date-time': 'dateTime',
    password: 'password'
  }
};

/**
 * Transform data types into common names
 * @param {Schema} schema
 * @return {String}
 */
const dataTypeResoler = schema => {
  if (schema.getReference()) {
    const name = schema.getReference().match(/\/([^/]*)$/i)[1];
    const link = anchor(name);
    return `[${name}](${'/client/dtos/#' + link})`;
  }
  if (schema.getType() in resolver) {
    if (schema.getFormat()) {
      return schema.getFormat() in resolver[schema.getType()]
        ? resolver[schema.getType()][schema.getFormat()]
        : `${schema.getType()} (${schema.getFormat()})`;
    }
    return schema.getType();
  }
  if (schema.getFormat()) {
    return `${schema.getType()} (${schema.getFormat()})`;
  }
  if (schema.getType() === 'array') {
    const subType = dataTypeResoler(schema.getItems());
    return `[ ${subType} ]`;
  }
  if (schema.getType()) {
    return schema.getType();
  }
  return '';
};

module.exports = dataTypeResoler;
