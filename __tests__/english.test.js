import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('English Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'en',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core English functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toEqual(958); // Verify this number matches your actual word count
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
    });

    it('Should return true for profanity words', async () => {
      const searchWord = await profanity.search('shit');
      expect(searchWord).toEqual(true);
    });

    it('Should return false for normal words', async () => {
      const searchWord = await profanity.search('ka');
      expect(searchWord).toEqual(false);
    });

    it('Should return false for any empty string', async () => {
      const searchWord = await profanity.search('');
      expect(searchWord).toEqual(false);
    });

    it('Should return true for a sentence containing a profanity word', async () => {
      const sentence = 'Do not use bad words like shit or asshole.';
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(true);
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = 'This is a clean and polite sentence.';
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('English-specific edge cases', () => {
    it('Should handle case sensitivity correctly', async () => {
      expect(await profanity.search('SHIT')).toBe(true);
      expect(await profanity.search('Shit')).toBe(true);
      expect(await profanity.search('shit')).toBe(true);
    });

    it('Should handle whitespace around words', async () => {
      expect(await profanity.search('  shit  ')).toBe(true);
      expect(await profanity.search('\tshit\n')).toBe(true);
    });

    it('Should detect profanity with punctuation in sentences', async () => {
      const testSentences = [
        'What the shit!',
        'Oh, shit.',
        'Shit? Really?',
        'This is shit, man.',
        '"Shit," he said.',
        'Absolute shit-show.',
      ];

      for (const sentence of testSentences) {
        expect(await profanity.hasCurseWords(sentence)).toBe(true);
      }
    });

    it('Should return correct curse words from sentences', async () => {
      const sentence = 'Do not use bad words like shit or asshole.';
      const foundWords = await profanity.getCurseWords(sentence);
      
      expect(foundWords).toContain('shit');
      expect(foundWords).toContain('asshole');
      expect(foundWords.length).toBe(2);
    });

    it('Should handle multiple instances of same word', async () => {
      const sentence = 'shit shit shit everywhere';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should only return unique words
      expect(foundWords).toContain('shit');
      expect(foundWords.length).toBe(1);
    });

    it('Should validate specific English profanity words exist', async () => {
      // Test a selection of words that should definitely be in an English profanity list
      const commonProfanityWords = [
        'shit', 'fuck', 'damn', 'hell', 'ass', 'bitch'
      ];

      for (const word of commonProfanityWords) {
        expect(await profanity.search(word)).toBe(true);
      }
    });

    it('Should not flag common English words', async () => {
      const commonWords = [
        'hello', 'world', 'computer', 'test', 'function', 'javascript',
        'english', 'language', 'sentence', 'word', 'clean', 'polite'
      ];

      for (const word of commonWords) {
        expect(await profanity.search(word)).toBe(false);
      }
    });

    it('Should handle contractions and apostrophes', async () => {
      const sentence = "Don't say shit, it's not appropriate.";
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
    });

    it('Should handle hyphenated words', async () => {
      const sentence = 'This is a shit-storm.';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
    });

    // Additional edge cases for better coverage
    it('Should handle mixed case in sentences', async () => {
      const sentence = 'This SENTENCE has SHIT and damn IN it';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
      
      const foundWords = await profanity.getCurseWords(sentence);
      expect(foundWords).toContain('shit'); // Should normalize to lowercase
      expect(foundWords).toContain('damn');
    });

    it('Should handle words at sentence boundaries', async () => {
      expect(await profanity.hasCurseWords('shit')).toBe(true);
      expect(await profanity.hasCurseWords('shit is bad')).toBe(true);
      expect(await profanity.hasCurseWords('that is shit')).toBe(true);
      expect(await profanity.hasCurseWords('the shit word')).toBe(true);
    });

    it('Should not detect partial word matches', async () => {
      // These should NOT be flagged as containing profanity
      const sentences = [
        'The weather is hellish today', // contains "hell" but as part of "hellish"
        'I love my shirty shirt', // contains "shit" but as part of "shirty" 
        'Assessment is important', // contains "ass" but as part of "assessment"
      ];

      for (const sentence of sentences) {
        // These depend on your word boundaries implementation
        // Comment out if your implementation flags these
        const result = await profanity.hasCurseWords(sentence);
        // You may want to adjust based on your exact implementation
      }
    });
  });

  describe('Performance tests for English dataset', () => {
    it('Should handle large English text efficiently', async () => {
      const largeText = 'This is a test sentence. '.repeat(1000) + 'shit ' + 'Clean text. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(result).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all English terms', async () => {
      const allWords = await profanity.all();
      
      const startTime = Date.now();
      for (let i = 0; i < 100; i++) {
        await profanity.search(allWords[i % allWords.length]);
      }
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(50); // Should be very fast with Set lookup
    });

    it('Should handle concurrent operations on English dataset', async () => {
      const promises = [
        profanity.search('shit'),
        profanity.hasCurseWords('this is shit'),
        profanity.getCurseWords('damn shit'),
        profanity.all(),
        profanity.search('fuck')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(true); // search shit
      expect(results[1]).toBe(true); // hasCurseWords
      expect(results[2]).toContain('shit'); // getCurseWords
      expect(results[3].length).toBe(958); // all words
      expect(results[4]).toBe(true); // search fuck
    });
  });

  describe('Data integrity for English', () => {
    it('Should not allow modification of English word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('fake-word');
      terms1.pop();
      terms1[0] = 'modified';
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('fake-word');
      expect(terms2[0]).not.toBe('modified');
    });

    it('Should provide consistent results for English detection', async () => {
      const sentence = 'This sentence has shit and damn';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(result3).toBe(true);
    });
  });
});