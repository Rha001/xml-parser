class Parser {
    constructor(input) {
        if(input.length > 0 && typeof input == 'string' && input.charAt(0) == '<')
            this.input = input;
        else
            throw new Error('Input has an error.');
    }

    parse() {
        let valuesStack = [];
        let output = {};

        for(const frag of this.input.split('<')) {
            const trimmed = frag.trim();
            if(trimmed.charAt(0) == '/') {
                const closingTag = trimmed.slice(1,trimmed.length - 1);
                console.log(' -> Close for: ' + closingTag + ' ≠≠≠ Stack: ');
                
                if(valuesStack[valuesStack.length - 2] == closingTag) {
                    // console.log(' *********** ', valuesStack);
                    const objValue = valuesStack.pop();
                    // valuesStack.pop();
                    valuesStack.push(objValue);
                } else if(valuesStack.indexOf(closingTag)) {

                }
                //valuesStack.push(closingTag);
            } else if(trimmed.charAt(trimmed.length - 1) == '>') {
                const newTag = trimmed.slice(0, trimmed.length - 1);

                if(Object.keys(output).length === 0) {
                    output[newTag] = null;
                } else {
                    valuesStack.push(newTag);
                }
                console.log(' ===== New Tag: ' + newTag);
            } else if(trimmed.indexOf('>')) {
                if(trimmed.length > 0) {
                    const keyValue = trimmed.split('>');
                    const newObj = {[keyValue[0]]: keyValue[1]};
                    valuesStack.push(keyValue[0],newObj);
                    console.log(' -> ' + trimmed + ' --- type: tag & value  >>> ', newObj);
                }
            } else
                console.log(' +++ Else for +++ ' + trimmed);
        }

        console.log('Output: \n', valuesStack);
    }
}

module.exports = Parser;

/*
<payment><amount>1000</amount><from><name>Evan</name><country>Mexico</country></from><to><name>PayStand</name><country>USA</country></to><details><time>8:00</time><status>received</status></details></payment>

<payment>
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
</payment>




payment>
amount>10.00
/amount>
from>
name>Evan
/name>
country>Mexico
/country>
/from>
to>
name>PayStand
/name>
country>USA
/country>
/to>
details>
time>8:00
/time>
status>received
/status>
/details>
/payment>

payment>amount>10.00/amount>from>name>Evan/name>country>Mexico/country>/from>to>name>PayStand/name>country>USA/country>/to>details>time>8:00/time>status>received/status>/details>/payment>

==========================================================================
{
    "payment": {
        "amount": "10.00",
        "from": "Evan",
        "to": "PayStand"
    }
}
*/