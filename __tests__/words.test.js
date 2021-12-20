import { profanityEngine } from '../index.js';

let profanity = new profanityEngine();

describe('Profanity tests', () => {

    it('Get all words in an array', async () => {
        const allWords = await profanity.all();
        expect(allWords.length).toEqual(453);
    });

    it('Search for the word Shit in list', async () => {
        const searchWord = await profanity.search('shit');
        expect(searchWord).toEqual(true);
    });

    it('Search for the word ka in list', async () => {
        const searchWord = await profanity.search('ka');
        expect(searchWord).toEqual(false);
    });
});
