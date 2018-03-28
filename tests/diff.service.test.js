const diffService  = require('../services/diff.service');

describe('Test the files comparison service', () => {
    test('The inputs are equal', () => {
        let left = "abc 123";
        let right = "abc 123";
        expect(diffService.compareInputs({left, right})).toEqual({
            isEqual: true,
            isDifferentInSize: false,
            diffs: []
        });
    });

    test('The inputs are of different size', () => {
        let left = "abc 12";
        let right = "abc 123";
        expect(diffService.compareInputs({left, right})).toEqual({
            isEqual: false,
            isDifferentInSize: true,
            diffs: []
        });
    });

    test('The inputs are of equal size, but different in content', () => {
        let left = "abc 123 M o";
        let right = "abc 456 M c";
        expect(diffService.compareInputs({left, right})).toEqual({
            isEqual: false,
            isDifferentInSize: false,
            diffs: [{start: 4, end: 6}, {start: 10, end: 10}]
        });
    });
});