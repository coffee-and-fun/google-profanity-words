import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('English Profanity tests', () => {
  beforeAll(async () => {
     profanity = new ProfanityEngine({
       language: 'en',
              testMode:true
     });
     await profanity.initialize(); // Initialize the profanity instance with the English language
   });

  it('Should get all the profanity words in an array',async () => {
    const allWords = await profanity.all();
    expect(allWords.length).toEqual(959);
  });

  it('Should return true for profanity words', async () => {
    const searchWord = await profanity.search('shit');
    expect(searchWord).toEqual(true);
  });

  it('Should return false for normal words', async() => {
    const searchWord = await profanity.search('ka');
    expect(searchWord).toEqual(false);
  });

  it('Should return false for any empty string',async () => {
    const searchWord = await profanity.search('');
    expect(searchWord).toEqual(true);
  });
});
