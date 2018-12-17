const Parser = require('./xml-parser.js');
// Parser is a ES6 class, it requires an xml in string format to work
const xml = `<xml><tag1>1</tag1><tag2><tag3><tag4>4</tag4></tag3></tag2></xml>`;

// Parser has a function called parse, which converts the string xml into a JSON if valid.
let output = new Parser(xml).parse();

// I log the JSON as an string so you can see all JSON content
console.log(JSON.stringify(output));

process.exit(0);