import { ProfanityEngine } from '../index.js';

let profanity = new ProfanityEngine({
  test: true
});

describe('Profanity tests', () => {

    it('Should get all the profanity words in an array', () => {
        const allWords = profanity.all();
        expect(allWords.length).toEqual(958);
    });

    it('Should return true for profanity words', () => {
        const searchWord = profanity.search('shit');
        expect(searchWord).toEqual(true);
    });

    it('Should return false for normal words', () => {
        const searchWord = profanity.search('ka');
        expect(searchWord).toEqual(false);
    });

    it('Should return false for any empty string', () => {
        const searchWord = profanity.search('');
        expect(searchWord).toEqual(false);
    });

    it('Should return false for SFW string', () => {
      const searchWord = profanity.searchWithin('hello world');
      expect(searchWord).toEqual(false);
    });

    it('Should retrun true for NSFW string in sentence', () => {
      const searchWord = profanity.searchWithin('hello world, fucker');
      expect(searchWord).toEqual(true);
    });

});
