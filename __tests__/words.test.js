import { profanityEngine } from '../index.js';

let profanity = new profanityEngine({
  test: true
});

describe('Profanity tests', () => {

    it('Should get all the profanity words in an array', () => {
        const allWords = profanity.all();
        expect(allWords.length).toEqual(451);
    });

    it('Should return true for profanity words', () => {
        const searchWord = profanity.search('shit');
        expect(searchWord).toEqual(true);
    });

    it('Should return false for normal words', () => {
        const searchWord = profanity.search('ka');
        expect(searchWord).toEqual(false);
    });
});
