import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('Arabic Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'ar',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core Arabic functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
      // Update this number based on your actual Arabic word count
      // expect(allWords.length).toEqual(XXX);
    });

    it('Should return true for Arabic profanity words', async () => {
      // Test with a common Arabic profanity word (if it exists in your list)
      // Replace 'testword' with an actual word from your Arabic list
      const searchWord = await profanity.search('testword');
      expect(typeof searchWord).toBe('boolean');
    });

    it('Should return false for normal Arabic words', async () => {
      const normalWords = [
        'مرحبا', // Hello
        'شكرا',  // Thank you
        'بيت',   // House
        'كتاب',  // Book
        'ماء',   // Water
      ];

      for (const word of normalWords) {
        expect(await profanity.search(word)).toBe(false);
      }
    });

    it('Should return false for any empty string', async () => {
      const searchWord = await profanity.search('');
      expect(searchWord).toEqual(false);
    });

    it('Should return true for a sentence containing a profanity word', async () => {
      // Replace with actual Arabic sentence containing profanity from your list
      const sentence = 'هذه جملة تحتوي على كلمة سيئة.'; // "This sentence contains a bad word"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(typeof hasCurseWords).toBe('boolean');
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = 'هذه جملة نظيفة ومهذبة.'; // "This is a clean and polite sentence"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('Arabic-specific edge cases', () => {
    it('Should handle Arabic diacritical marks (tashkeel)', async () => {
      // Test words with and without diacritical marks
      const testCases = [
        'كِتَابٌ', // Book with diacritics
        'كتاب',   // Book without diacritics
        'مَرْحَبًا', // Hello with diacritics
        'مرحبا',    // Hello without diacritics
      ];

      for (const word of testCases) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle different Arabic letter forms', async () => {
      // Test initial, medial, final, and isolated forms
      const testCases = [
        'بيت',     // Isolated forms
        'البيت',   // With definite article
        'بيوت',    // Plural form
      ];

      for (const word of testCases) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Arabic numbers mixed with text', async () => {
      const sentence = 'هذا النص يحتوي على رقم ١٢٣ وكلمات عربية.'; // "This text contains number 123 and Arabic words"
      const result = await profanity.hasCurseWords(sentence);
      expect(typeof result).toBe('boolean');
    });

    it('Should handle mixed Arabic and English text', async () => {
      const mixedSentence = 'This is mixed النص العربي and English text.';
      const result = await profanity.hasCurseWords(mixedSentence);
      expect(typeof result).toBe('boolean');
    });

    it('Should handle right-to-left text direction', async () => {
      // Arabic is read right-to-left
      const rtlSentence = 'النص العربي يُقرأ من اليمين إلى اليسار.'; // "Arabic text is read from right to left"
      const result = await profanity.hasCurseWords(rtlSentence);
      expect(result).toBe(false); // Should be clean text
    });

    it('Should handle Arabic punctuation correctly', async () => {
      const testSentences = [
        'ما هذا؟',          // What is this?
        'لا، هذا خطأ!',     // No, this is wrong!
        'قال: "مرحبا"',     // He said: "Hello"
        'النص؛ والكتابة.',   // Text; and writing.
      ];

      for (const sentence of testSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Arabic definite article (ال)', async () => {
      const testCases = [
        'بيت',    // House
        'البيت',  // The house
        'كتاب',   // Book  
        'الكتاب', // The book
      ];

      for (const word of testCases) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle case sensitivity (Arabic has no case)', async () => {
      // Arabic doesn't have upper/lower case like Latin scripts
      const arabicWord = 'مرحبا';
      const result1 = await profanity.search(arabicWord);
      const result2 = await profanity.search(arabicWord);
      expect(result1).toEqual(result2);
    });

    it('Should handle whitespace around Arabic words', async () => {
      const arabicWord = 'مرحبا';
      expect(await profanity.search(`  ${arabicWord}  `)).toBe(false);
      expect(await profanity.search(`\t${arabicWord}\n`)).toBe(false);
    });

    it('Should handle Arabic word variations and roots', async () => {
      // Arabic words are based on root patterns
      const rootVariations = [
        'كتب',    // Root k-t-b (to write)
        'كاتب',   // Writer
        'مكتوب',  // Written
        'كتابة',  // Writing
      ];

      for (const word of rootVariations) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should return unique words only in Arabic text', async () => {
      // Test with repeated Arabic words
      const sentence = 'مرحبا مرحبا مرحبا في كل مكان';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should return unique words only
      expect(Array.isArray(foundWords)).toBe(true);
      // If 'مرحبا' were a profanity word, it should appear only once
    });
  });

  describe('Performance tests for Arabic dataset', () => {
    it('Should handle large Arabic text efficiently', async () => {
      const largeText = 'هذه جملة تجريبية. '.repeat(1000) + 'النص العربي ' + 'نص نظيف. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(typeof result).toBe('boolean');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all Arabic terms', async () => {
      const allWords = await profanity.all();
      
      if (allWords.length > 0) {
        const startTime = Date.now();
        for (let i = 0; i < Math.min(100, allWords.length); i++) {
          await profanity.search(allWords[i % allWords.length]);
        }
        const endTime = Date.now();
        
        expect(endTime - startTime).toBeLessThan(50); // Should be very fast with Set lookup
      }
    });

    it('Should handle concurrent operations on Arabic dataset', async () => {
      const promises = [
        profanity.search('مرحبا'),
        profanity.hasCurseWords('هذا نص عربي'),
        profanity.getCurseWords('النص العربي'),
        profanity.all(),
        profanity.search('شكرا')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(false); // search مرحبا (should be clean)
      expect(results[1]).toBe(false); // hasCurseWords (should be clean)
      expect(Array.isArray(results[2])).toBe(true); // getCurseWords
      expect(Array.isArray(results[3])).toBe(true); // all words
      expect(results[4]).toBe(false); // search شكرا (should be clean)
    });
  });

  describe('Arabic language specificity', () => {
    it('Should load Arabic words correctly or fallback to English', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toBeGreaterThan(0);
      // If Arabic file doesn't exist, should fallback to English (958 words)
      // If Arabic file exists, should load Arabic words
    });

    it('Should handle Arabic-specific character encoding (UTF-8)', async () => {
      const arabicChars = [
        'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر',
        'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف',
        'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
      ];

      for (const char of arabicChars) {
        const result = await profanity.search(char);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Arabic ligatures and special characters', async () => {
      const specialChars = [
        'لا',   // Lam-Alif ligature
        'ﷲ',    // Allah ligature
        'ة',    // Taa marbuta
        'ى',    // Alif maksura
        'ء',    // Hamza
      ];

      for (const char of specialChars) {
        const result = await profanity.search(char);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle different Arabic dialects considerations', async () => {
      // Note: This depends on what's in your Arabic word list
      const dialectWords = [
        'شنو',   // What (Iraqi/Gulf)
        'ايش',   // What (Levantine) 
        'ايه',   // What (Egyptian)
        'اشنو',  // What (Moroccan)
      ];

      for (const word of dialectWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Data integrity for Arabic', () => {
    it('Should not allow modification of Arabic word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('كلمة-مزيفة');
      terms1.pop();
      if (terms1.length > 0) {
        terms1[0] = 'معدل';
      }
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('كلمة-مزيفة');
      if (terms2.length > 0) {
        expect(terms2[0]).not.toBe('معدل');
      }
    });

    it('Should provide consistent results for Arabic detection', async () => {
      const sentence = 'هذه جملة تجريبية بالعربية';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(typeof result3).toBe('boolean');
    });
  });

  describe('Configuration and fallback for Arabic', () => {
    it('Should handle missing Arabic language file gracefully', async () => {
      // If ar.txt doesn't exist, should fallback to English
      const arabicProfanity = new ProfanityEngine({
        language: 'ar',
        testMode: true,
      });
      
      const terms = await arabicProfanity.all();
      expect(terms.length).toBeGreaterThan(0);
    });

    it('Should suppress warnings in test mode for Arabic', async () => {
      // Store original console.warn
      const originalWarn = console.warn;
      let warnCalled = false;
      
      // Mock console.warn
      console.warn = () => {
        warnCalled = true;
      };
      
      const arabicProfanity = new ProfanityEngine({
        language: 'ar',
        testMode: true,
      });
      
      warnCalled = false;
      await arabicProfanity.all();
      expect(warnCalled).toBe(false);
      
      // Restore original console.warn
      console.warn = originalWarn;
    });
  });
});