const Parser = require('./xml-parser.js');
const xml = `<payment>
<amount>10.00</amount>
<from>
    <name>Evan</name>
    <location>
        <country>Mexico</country>
        <city>Guadalajara</city>
    </location>
</from>
<to>
    <name>PayStand</name>
    <country>USA</country>
</to>
<details>
    <time>8:00</time>
    <status>received</status>
</details>
</payment>`;
let parser = new Parser(xml);

parser.parse();
process.exit(0);