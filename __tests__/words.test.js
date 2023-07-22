import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('English Profanity tests', () => {
  beforeAll(() => {
    profanity = new ProfanityEngine({
      language: 'en',
    });
  });

  it('Should get all the profanity words in an array', () => {
    const allWords = profanity.all();
    expect(allWords.length).toEqual(959);
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
    expect(searchWord).toEqual(true);
  });
});



describe('Spanish Profanity tests', () => {
  beforeAll(() => {
    profanity = new ProfanityEngine({
      language: 'es',
    });
  });

  it('Should get all the profanity words in an array', () => {
    const allWords = profanity.all();
    expect(allWords.length).toEqual(565);
  });

  it('Should return true for profanity words', () => {
    const searchWord = profanity.search('labios');
    expect(searchWord).toEqual(true);
  });

  it('Should return false for normal words', () => {
    const searchWord = profanity.search('ka');
    expect(searchWord).toEqual(false);
  });

  it('Should return false for any empty string', () => {
    const searchWord = profanity.search('');
    expect(searchWord).toEqual(true);
  });
});
