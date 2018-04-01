const diffService  = require('../services/diff.service');
const diffResponseModel = require('../services/diff-response.model');

let diffModel;
describe('Test the files comparison service', () => {
    beforeEach(() => {
        diffModel = diffResponseModel();
    });

    test('The inputs are equal', () => {

        let left = "abc 123";
        let right = "abc 123";
        expect(diffService.compareInputs({left, right})).toEqual(diffModel);
    });

    describe('The inputs are of different size', () => {
        test('Left is larger', () => {
            let left = "abc 123";
            let right = "abc 12";
            diffModel.isEqual = false;
            diffModel.isDifferentInSize = true;

            expect(diffService.compareInputs({left, right})).toEqual(diffModel);
        });

        test('Right is larger', () => {
            let left = "abc 12";
            let right = "abc 123";

            diffModel.isEqual = false;
            diffModel.isDifferentInSize = true;
            expect(diffService.compareInputs({left, right})).toEqual(diffModel);
        });
    });


    describe('The inputs are of equal size, but different in content', () => {
        test('Two diffs', () => {
            let left = "abc 123 M o";
            let right = "abc 456 M c";
            diffModel.isEqual = false;
            diffModel.diffs = [{start: 4, end: 6}, {start: 10, end: 10}];
            expect(diffService.compareInputs({left, right})).toEqual(diffModel);
        });


        test('Diff in the middle', () => {
            let left = "ABCDEFG";
            let right = "ABcDEFG";
            diffModel.isEqual = false;
            diffModel.diffs = [{start: 2, end: 2}];

            expect(diffService.compareInputs({left, right})).toEqual(diffModel);
        });

        test('Diff at start', () => {
            let left = "abCDEFG";
            let right = "ABCDEFG";

            diffModel.isEqual = false;
            diffModel.diffs = [{start: 0, end: 1}];

            expect(diffService.compareInputs({left, right})).toEqual(diffModel);
        })
    });
});

afterAll(() => {
    process.emit("close")
});