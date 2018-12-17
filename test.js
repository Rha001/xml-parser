const expect = require('chai').expect;
const Parser = require('./xml-parser.js');

describe('Validations:', () => {
    it('Input should not be empty', () => {
        expect(() => {
            new Parser('');
        }).to.throw('Input has an error.');
    });

    it('Input should be an string', () => {
        expect(() => {
            new Parser(123);
        }).to.throw('Input has an error.');
    });

    it('First char of input should be "<"', () => {
        expect(() => {
            new Parser('abc');
        }).to.throw('Input has an error.');
    });

    it('Should throw Malformed JSON.', () => {
        expect(() => {
            new Parser('<example><example>').parse()
        }).to.throw('Malformed JSON.');
    });
});

describe('Parser:', () => {
    it('<example><b>5</b></example> Should return {"example": { "b": "5" }}', () => {
        expect(
            new Parser(`<example><b>5</b></example>`).parse()
        ).to.have.deep.property('example', {b:"5"});
    });

    it('<tag><tag2><tag3>3</tag3></tag2></tag> Should return {"tag": {"tag2": { "tag3": "3" }}}', () => {
        expect(
            new Parser(`<tag><tag2><tag3>3</tag3></tag2></tag>`).parse()
        ).to.have.deep.property('tag', {tag2:{ tag3:"3"}});
    });

    it('Should be able to parse given XML', () => {
        expect(
            new Parser(`<payment>
            <amount>10.00</amount>
            <from>Evan</from>
            <to>PayStand</to>
        </payment>`).parse()
        ).to.have.deep.property('payment', {amount:"10.00",from:"Evan",to:"PayStand"});
    });

    it('Should output a valid JSON', () => {
        expect(
            JSON.stringify(new Parser(`<payment>
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
            </payment>`).parse())
        ).to.equal(`{"payment":{"amount":"10.00","from":{"name":"Evan","location":{"country":"Mexico","city":"Guadalajara"}},"to":{"name":"PayStand","country":"USA"},"details":{"time":"8:00","status":"received"}}}`);
    });
});
