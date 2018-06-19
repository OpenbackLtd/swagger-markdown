#! /usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const { ArgumentParser } = require('argparse');
const transformInfo = require('./transformers/info');
const transformPath = require('./transformers/path');
const transformSecurityDefinitions = require('./transformers/securityDefinitions');
const transformExternalDocs = require('./transformers/externalDocs');
const transformDefinition = require('./transformers/definitions');
const packageInfo = require('../package.json');

const parser = new ArgumentParser({
  addHelp: true,
  description: 'swagger-markdown',
  version: packageInfo.version
});

parser.addArgument(['-i', '--input'], {
  required: true,
  help: 'Path to the swagger yaml file',
  metavar: '',
  dest: 'input'
});
parser.addArgument(['-o', '--output'], {
  help: 'Path to the resulting output directory.',
  metavar: '',
  dest: 'output'
});
const args = parser.parseArgs();

if (args.input) {
  const document = [];
  const dtos = [];

  try {
    const inputDoc = yaml.safeLoad(fs.readFileSync(args.input, 'utf8'));
    const outputDirectory = args.output || args.input.replace(/(yaml|yml|json)$/i, 'md');

    // Collect parameters
    const parameters = ('parameters' in inputDoc) ? inputDoc.parameters : {};

    // Process info
    if ('info' in inputDoc) {
      document.push(transformInfo(inputDoc.info));
    }

    if ('externalDocs' in inputDoc) {
      document.push(transformExternalDocs(inputDoc.externalDocs));
    }

    // Security definitions
    if ('securityDefinitions' in inputDoc) {
      document.push(transformSecurityDefinitions(inputDoc.securityDefinitions));
    }

    // Process Paths
    if ('paths' in inputDoc) {
      Object.keys(inputDoc.paths).forEach(path => document.push(transformPath(
        path,
        inputDoc.paths[path],
        parameters
      )));
    }

    // Models (definitions)
    if ('definitions' in inputDoc) {
      dtos.push(transformDefinition(inputDoc.definitions));
    }

    fs.writeFile(outputDirectory + "api.md", document.join('\n'), err => {
      if (err) {
        console.log(err);
      }
    });

    fs.writeFile(outputDirectory + "dtos.md", dtos.join('\n'), err => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
