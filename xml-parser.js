class Parser {
    constructor(input) {
        if(input.length > 0 && typeof input == 'string' && input.charAt(0) == '<')
            this.input = input;
        else
            throw new Error('Input has an error.');
    }

    parse() {
        let output = {}, outputStr = '', lastValueOpened = '', level = '', valueLevel = '';
        for(const frag of this.input.split('<')) {
            const trimmed = frag.trim();
            if(trimmed.charAt(0) == '/') {// Closing Tag
                const closingTag = trimmed.slice(1,trimmed.length - 1);

                if(closingTag !== lastValueOpened)
                    outputStr += `}`;
            } else if(trimmed.charAt(trimmed.length - 1) == '>') {// Opening Tag
                const newTag = trimmed.slice(0, trimmed.length - 1);
                level = newTag;

                if(outputStr.length === 0) {
                    outputStr += `{"${newTag}":{`;
                } else if(valueLevel == '') {
                    outputStr += `"${newTag}":{`;
                } else {
                    outputStr += `,"${newTag}":{`;
                }
            } else if(trimmed.indexOf('>')) {// Value
                if(trimmed.length > 0) {
                    const keyValue = trimmed.split('>');
                    lastValueOpened = keyValue[0];

                    if(valueLevel !== level)
                        outputStr += `"${keyValue[0]}":"${keyValue[1]}"`;
                    else
                        outputStr += `,"${keyValue[0]}":"${keyValue[1]}"`;

                    valueLevel = level;
                }
            } else
                throw new Error('Unexpected error.');
        }
        outputStr += `}`;

        //console.log('Output: ', outputStr);
        
        try {
            output = JSON.parse(outputStr);
        } catch(err) {
            throw new Error('Malformed JSON.');
        }

        return output;
    }
}

module.exports = Parser;