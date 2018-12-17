const Parser = require('./xml-parser.js');
const xml = `<tag><tag2><tag3>3</tag3></tag2></tag>`;
let output = new Parser(xml).parse();

console.log(JSON.stringify(output));

process.exit(0);