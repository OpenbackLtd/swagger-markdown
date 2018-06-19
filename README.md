swagger-markdown
================

[![npm][npm-image]][npm-url] [![dependencies][david-image]][david-url] [![circle ci][circleci-image]][circleci-url]

CLI script to turn swagger yaml into markdown files.
Supports swagger 2.0 format only

see [examples](https://github.com/syroegkin/swagger-markdown/tree/master/examples) folder

### Installation

    npm install -g swagger-markdown

### Usage

```
swagger-markdown [-h] [-v] -i  [-o]

Options:
  -h, --help      Show this help message and exit.
  -v, --version   Show program's version number and exit.
  -i , --input    Path to the swagger yaml file
  -o , --output   Path to the resulting output directory.

```

#### Example:

```javascript
swagger-markdown -i path/to/swagger/file.yaml
```
By default it will output the markdown files to the home directory. To specify the output directory, pass the following command: `swagger-markdown -i path/to/swagger/swaggger.json -o /path/to/output/`

You can also use it as a npm script in your package.json:

    npm i --save-dev swagger-markdown

```json
{
    "scripts": {
        "md-docs": "swagger-markdown -i path/to/swagger.yaml",
        ...
    }
}
```

    npm run md-docs

[npm-url]: https://www.npmjs.com/package/swagger-markdown
[npm-image]: https://img.shields.io/npm/v/swagger-markdown.svg

[david-url]: https://david-dm.org/syroegkin/swagger-markdown
[david-image]: https://img.shields.io/david/syroegkin/swagger-markdown.svg

[circleci-url]: https://circleci.com/gh/syroegkin/swagger-markdown/tree/master
[circleci-image]: https://img.shields.io/circleci/project/syroegkin/swagger-markdown.svg
