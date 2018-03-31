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

    describe('The inputs are of different size', () => {
        test('Left is larger', () => {
            let left = "abc 123";
            let right = "abc 12";
            expect(diffService.compareInputs({left, right})).toEqual({
                isEqual: false,
                isDifferentInSize: true,
                diffs: []
            });
        });

        test('Right is larger', () => {
            let left = "abc 12";
            let right = "abc 123";
            expect(diffService.compareInputs({left, right})).toEqual({
                isEqual: false,
                isDifferentInSize: true,
                diffs: []
            });
        });
    });


    describe('The inputs are of equal size, but different in content', () => {
        test('Two diffs', () => {
            let left = "abc 123 M o";
            let right = "abc 456 M c";
            expect(diffService.compareInputs({left, right})).toEqual({
                isEqual: false,
                isDifferentInSize: false,
                diffs: [{start: 4, end: 6}, {start: 10, end: 10}]
            });
        })

        test('Diff in the middle', () => {
            let left = "ABCDEFG";
            let right = "ABcDEFG";
            expect(diffService.compareInputs({left, right})).toEqual({
                isEqual: false,
                isDifferentInSize: false,
                diffs: [{start: 2, end: 2}]
            });
        })

        test('Diff at start', () => {
            let left = "abCDEFG";
            let right = "ABCDEFG";
            expect(diffService.compareInputs({left, right})).toEqual({
                isEqual: false,
                isDifferentInSize: false,
                diffs: [{start: 0, end: 1}]
            });
        })
    });
});

afterAll(() => {
    process.emit("close")
});