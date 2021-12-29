import { profanityEngine } from '../index.js';

let profanity = new profanityEngine({
  test: true
});

describe('Profanity tests', () => {

    it('Get all words in an array', () => {
        const allWords = profanity.all();
        expect(allWords.length).toEqual(452);
    });

    it('Search for the word Shit in list', () => {
        const searchWord = profanity.search('shit');
        expect(searchWord).toEqual(true);
    });

    it('Search for the word ka in list', () => {
        const searchWord = profanity.search('ka');
        expect(searchWord).toEqual(false);
    });
});
