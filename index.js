const Parser = require('./xml-parser.js');
const xml = `<payment>
<amount>10.00</amount>
<from>Evan</from>
<to>PayStand</to>
</payment>`;
let parser = new Parser(xml);

parser.parse();
process.exit(0);