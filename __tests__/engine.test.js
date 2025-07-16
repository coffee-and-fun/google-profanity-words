import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('ProfanityEngine v3 API tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'en',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core functionality', () => {
    it('Should return all profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
      expect(allWords.length).toEqual(958); // Adjust based on your actual count
    });

    it('Should detect profanity words correctly', async () => {
      expect(await profanity.search('hell')).toBe(true);
      expect(await profanity.search('damn')).toBe(true);
    });

    it('Should return false for clean words', async () => {
      expect(await profanity.search('hello')).toBe(false);
      expect(await profanity.search('world')).toBe(false);
      expect(await profanity.search('test')).toBe(false);
    });

    it('Should detect profanity in sentences', async () => {
      const sentence = 'This is a test sentence with bad words like hell and damn';
      const hasProfanity = await profanity.hasCurseWords(sentence);
      expect(hasProfanity).toBe(true);
    });

    it('Should return false for clean sentences', async () => {
      const sentence = 'This is a test sentence with no bad words';
      const hasProfanity = await profanity.hasCurseWords(sentence);
      expect(hasProfanity).toBe(false);
    });

    it('Should return list of found profanity words', async () => {
      const sentence = 'This is a test sentence with bad words like hell and damn';
      const badWords = await profanity.getCurseWords(sentence);
      expect(badWords).toEqual(expect.arrayContaining(['hell', 'damn']));
      expect(badWords).toHaveLength(2);
    });

    it('Should return empty array if no curse words found', async () => {
      const sentence = 'This is a test sentence with no bad words';
      const result = await profanity.getCurseWords(sentence);
      expect(result).toEqual([]);
    });
  });

  describe('Language fallback behavior', () => {
    it('Should fallback to English for unsupported languages', async () => {
      const unsupportedProfanity = new ProfanityEngine({
        language: 'nonexistent-language',
        testMode: true,
      });
      
      const terms = await unsupportedProfanity.all();
      expect(terms.length).toEqual(958); // Should load English words
    });

    it('Should work with supported languages', async () => {
      const spanishProfanity = new ProfanityEngine({
        language: 'es',
        testMode: true,
      });
      
      const terms = await spanishProfanity.all();
      expect(terms.length).toBeGreaterThan(0);
      // Should be different from English if Spanish file exists
    });
  });

  describe('Input validation and edge cases', () => {
    it('Should handle empty strings gracefully', async () => {
      expect(await profanity.search('')).toBe(false);
      expect(await profanity.hasCurseWords('')).toBe(false);
      expect(await profanity.getCurseWords('')).toEqual([]);
    });

    it('Should handle null/undefined inputs gracefully', async () => {
      expect(await profanity.search(null)).toBe(false);
      expect(await profanity.search(undefined)).toBe(false);
      expect(await profanity.hasCurseWords(null)).toBe(false);
      expect(await profanity.hasCurseWords(undefined)).toBe(false);
      expect(await profanity.getCurseWords(null)).toEqual([]);
      expect(await profanity.getCurseWords(undefined)).toEqual([]);
    });

    it('Should handle non-string inputs gracefully', async () => {
      expect(await profanity.search(123)).toBe(false);
      expect(await profanity.search({})).toBe(false);
      expect(await profanity.search([])).toBe(false);
      expect(await profanity.hasCurseWords(123)).toBe(false);
      expect(await profanity.getCurseWords(123)).toEqual([]);
    });

    it('Should handle punctuation correctly', async () => {
      const sentence = 'What the hell! Damn, that sucks.';
      const result = await profanity.hasCurseWords(sentence);
      expect(result).toBe(true);
      
      const foundWords = await profanity.getCurseWords(sentence);
      expect(foundWords).toContain('hell');
      expect(foundWords).toContain('damn');
    });

    it('Should return unique words only', async () => {
      const sentence = 'hell hell damn damn hell';
      const badWords = await profanity.getCurseWords(sentence);
      expect(badWords).toHaveLength(2);
      expect(badWords).toEqual(expect.arrayContaining(['hell', 'damn']));
    });

    it('Should be case insensitive', async () => {
      expect(await profanity.search('HELL')).toBe(true);
      expect(await profanity.search('Hell')).toBe(true);
      expect(await profanity.search('hell')).toBe(true);
      
      const sentence = 'This has HELL and Damn in it';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
    });

    it('Should handle whitespace properly', async () => {
      expect(await profanity.search('  hell  ')).toBe(true);
      expect(await profanity.search('\thell\n')).toBe(true);
    });

    it('Should handle various punctuation marks', async () => {
      const testSentences = [
        'What the hell?',
        'Damn!',
        'Hell, no!',
        'Oh-hell-no',
        'hell.',
        'hell,',
        'hell;',
        'hell:',
        '(hell)',
        '[hell]',
        '{hell}',
        '"hell"',
        "'hell'",
      ];
      
      for (const sentence of testSentences) {
        expect(await profanity.hasCurseWords(sentence)).toBe(true);
      }
    });
  });

  describe('Data integrity and immutability', () => {
    it('Should not modify original terms array', async () => {
      const terms1 = await profanity.all();
      const terms2 = await profanity.all();
      
      terms1.push('test-word');
      expect(terms2).not.toContain('test-word');
      expect(terms1.length).not.toEqual(terms2.length);
    });

    it('Should return consistent results across multiple calls', async () => {
      const sentence = 'This sentence has hell and damn';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(result3).toBe(true);
    });

    it('Should maintain state after reset', async () => {
      // Use the profanity engine
      await profanity.search('hell');
      expect(profanity.isInitialized).toBe(true);
      
      // Reset it
      profanity.reset();
      expect(profanity.isInitialized).toBe(false);
      
      // Should work again after reset
      expect(await profanity.search('hell')).toBe(true);
      expect(profanity.isInitialized).toBe(true);
    });
  });

  describe('Performance and concurrency', () => {
    it('Should handle concurrent operations', async () => {
      const promises = [
        profanity.search('hell'),
        profanity.hasCurseWords('this is hell'),
        profanity.getCurseWords('damn hell'),
        profanity.all(),
        profanity.search('damn')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(true); // search hell
      expect(results[1]).toBe(true); // hasCurseWords
      expect(results[2]).toContain('hell'); // getCurseWords
      expect(results[3].length).toBeGreaterThan(0); // all
      expect(results[4]).toBe(true); // search damn
    });

    it('Should handle large text efficiently', async () => {
      const largeText = 'This is a test sentence. '.repeat(1000) + 'hell ' + 'Clean text. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(result).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });

    it('Should initialize only once even with multiple method calls', async () => {
      const newProfanity = new ProfanityEngine({
        language: 'en',
        testMode: true,
      });
      
      // Multiple calls should not re-initialize
      await newProfanity.search('test');
      await newProfanity.hasCurseWords('test');
      await newProfanity.all();
      
      expect(newProfanity.isInitialized).toBe(true);
    });
  });

  describe('Configuration options', () => {
    it('Should use default configuration when no config provided', () => {
      const defaultProfanity = new ProfanityEngine();
      expect(defaultProfanity.language).toBe('en');
      expect(defaultProfanity.isTestMode).toBe(false);
    });

    it('Should handle partial configuration objects', () => {
      const partialProfanity = new ProfanityEngine({ language: 'es' });
      expect(partialProfanity.language).toBe('es');
      expect(partialProfanity.isTestMode).toBe(false);
    });

    it('Should respect testMode setting', async () => {
      // Store original console.warn
      const originalWarn = console.warn;
      let warnCalled = false;
      
      // Mock console.warn
      console.warn = () => {
        warnCalled = true;
      };
      
      // Test mode should suppress warnings
      const testProfanity = new ProfanityEngine({
        language: 'nonexistent-language',
        testMode: true,
      });
      
      warnCalled = false;
      await testProfanity.all();
      expect(warnCalled).toBe(false);
      
      // Production mode should show warnings
      const prodProfanity = new ProfanityEngine({
        language: 'nonexistent-language',
        testMode: false,
      });
      
      warnCalled = false;
      await prodProfanity.all();
      expect(warnCalled).toBe(true);
      
      // Restore original console.warn
      console.warn = originalWarn;
    });
  });
});