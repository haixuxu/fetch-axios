const translator = require('../dist/translator.cjs');
const context = require('./mock');

console.log(translator(context.templateData, {}));
