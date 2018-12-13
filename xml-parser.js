class Parser {
    constructor(input) {
        if(input.length > 0 && typeof input == 'string' && input.charAt(0) == '<')
            this.input = input;
        else
            throw new Error('Input has an error.');
    }

    parse() {
        let parts = '';
        for(const frag of this.input.split('<')) {
            if(frag.trim().charAt(0) == '/')
                console.log(' -> ' + frag + ' type: Close');
            else if(frag.trim().charAt(frag.length - 1) == '>')
                console.log(' -> ' + frag + ' type: new Tag');
            else
                console.log(' -> ' + frag.charAt(frag.length) + ' type: value');
        }
    }
}

module.exports = Parser;

/*
<payment><amount>1000</amount><from><name>Evan</name><country>Mexico</country></from><to><name>PayStand</name><country>USA</country></to><details><time>8:00</time><status>received</status></details></payment>

<payment>
    <amount>10.00</amount>
    <from>
        <name>Evan</name>
        <country>Mexico</country>
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