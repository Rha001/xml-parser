const expect = require('chai').expect;
const Parser = require('./xml-parser.js');

describe('Validations:', () => {
    it('Input should not be empty', () => {
        expect(() => {
            let toParse = new Parser('');
        }).to.throw('Input has an error.');
    });

    it('Input should be an string', () => {
        expect(() => {
            let toParse = new Parser(123);
        }).to.throw('Input has an error.');
    });
    it('First char of input should be "<"', () => {
        expect(() => {
            let toParse = new Parser('abc');
        }).to.throw('Input has an error.');
    });
});

describe('Parser:', () => {
    it('Should output: example', () => {
        
    });
});