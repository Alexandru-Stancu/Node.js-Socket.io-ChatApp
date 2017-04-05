var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        var from = 'X';
        var text = 'message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
    
        var from = 'Y';
        var lat = 1;
        var lng = 1;
        var url = 'https://www.google.com/maps?q=1,1';
        var locmess = generateLocationMessage(from, lat, lng);

        expect(locmess.createdAt).toBeA('number');
        expect(locmess).toInclude({from, url});

    });
}); 