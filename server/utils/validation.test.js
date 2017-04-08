const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(4)).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        expect(isRealString('  ')).toBe(false);
    });

    it('should allow strings with non-space chars', () => {
        expect(isRealString('   lotr    ')).toBe(true);
    });
});