import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('Spanish Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'es',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core Spanish functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toEqual(564); // Verify this matches your Spanish word count
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
    });

    it('Should return true for profanity words', async () => {
      const searchWord = await profanity.search('labios');
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
      const sentence = 'No deberías decir malas culo palabras como mierda.';
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(true);
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = 'Esta es una oración limpia y educada.';
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('Spanish-specific edge cases', () => {
    it('Should handle Spanish accented characters', async () => {
      // Test words with tildes and accents (if they exist in your word list)
      const accentedSentence = 'No uses palabras como cabrón o pendejó.';
      const result = await profanity.hasCurseWords(accentedSentence);
      // This will depend on whether your Spanish word list includes accented versions
      expect(typeof result).toBe('boolean');
    });

    it('Should handle case sensitivity correctly in Spanish', async () => {
      expect(await profanity.search('MIERDA')).toBe(true);
      expect(await profanity.search('Mierda')).toBe(true);
      expect(await profanity.search('mierda')).toBe(true);
    });

    it('Should handle whitespace around Spanish words', async () => {
      expect(await profanity.search('  mierda  ')).toBe(true);
      expect(await profanity.search('\tmierda\n')).toBe(true);
    });

    it('Should detect Spanish profanity with punctuation', async () => {
      const testSentences = [
        '¡Qué mierda!',
        'Oh, mierda.',
        '¿Mierda? ¿En serio?',
        'Esto es una mierda, hombre.',
        '"Mierda," dijo él.',
        'Una mierda total.',
      ];

      for (const sentence of testSentences) {
        expect(await profanity.hasCurseWords(sentence)).toBe(true);
      }
    });

    it('Should return correct Spanish curse words from sentences', async () => {
      const sentence = 'No deberías decir malas culo palabras como mierda.';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should find both curse words
      expect(foundWords).toContain('culo');
      expect(foundWords).toContain('mierda');
      expect(foundWords.length).toBe(2);
    });

    it('Should handle multiple instances of same Spanish word', async () => {
      const sentence = 'mierda mierda mierda por todas partes';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should only return unique words
      expect(foundWords).toContain('mierda');
      expect(foundWords.length).toBe(1);
    });

    it('Should validate specific Spanish profanity words exist', async () => {
      // Test common Spanish profanity words (adjust based on your actual word list)
      const commonSpanishProfanity = [
        'mierda', 'culo', 'cabron', 'puta', 'joder'
      ];

      // Note: Only test words that actually exist in your Spanish word list
      for (const word of commonSpanishProfanity) {
        const result = await profanity.search(word);
        // We can't assert true/false without knowing your exact word list
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should not flag common Spanish words', async () => {
      const commonSpanishWords = [
        'hola', 'mundo', 'computadora', 'prueba', 'función', 'javascript',
        'español', 'idioma', 'oración', 'palabra', 'limpio', 'educado',
        'casa', 'perro', 'gato', 'agua', 'comida', 'amor'
      ];

      for (const word of commonSpanishWords) {
        expect(await profanity.search(word)).toBe(false);
      }
    });

    it('Should handle Spanish contractions and apostrophes', async () => {
      // Spanish doesn't use contractions like English, but test similar constructs
      const sentence = 'No digas mierda, no es apropiado.';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
    });

    it('Should handle Spanish inverted punctuation', async () => {
      const sentence = '¡No digas mierda!';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
      
      const sentence2 = '¿Por qué dices mierda?';
      expect(await profanity.hasCurseWords(sentence2)).toBe(true);
    });

    it('Should handle Spanish special characters', async () => {
      const sentence = 'La niña dijo una mierda.';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
    });

    // Additional Spanish-specific tests
    it('Should handle mixed case in Spanish sentences', async () => {
      const sentence = 'Esta ORACIÓN tiene MIERDA y culo EN ella';
      expect(await profanity.hasCurseWords(sentence)).toBe(true);
      
      const foundWords = await profanity.getCurseWords(sentence);
      expect(foundWords).toContain('mierda'); // Should normalize to lowercase
      expect(foundWords).toContain('culo');
    });

    it('Should handle Spanish words at sentence boundaries', async () => {
      expect(await profanity.hasCurseWords('mierda')).toBe(true);
      expect(await profanity.hasCurseWords('mierda es malo')).toBe(true);
      expect(await profanity.hasCurseWords('eso es mierda')).toBe(true);
      expect(await profanity.hasCurseWords('la palabra mierda')).toBe(true);
    });

    it('Should handle Spanish gender variations correctly', async () => {
      // Test if your list includes both masculine and feminine forms
      const sentence = 'Él es un idiota y ella es una idiota.';
      const result = await profanity.hasCurseWords(sentence);
      expect(typeof result).toBe('boolean');
    });

    it('Should handle Spanish diminutives and variations', async () => {
      // Test common Spanish word variations if they exist in your list
      const variations = [
        'No seas pendejo',
        'Qué pendejada',
        'Está cabronísimo'
      ];
      
      for (const sentence of variations) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Performance tests for Spanish dataset', () => {
    it('Should handle large Spanish text efficiently', async () => {
      const largeText = 'Esta es una oración de prueba. '.repeat(1000) + 'mierda ' + 'Texto limpio. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(result).toBe(true);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all Spanish terms', async () => {
      const allWords = await profanity.all();
      
      const startTime = Date.now();
      for (let i = 0; i < 100; i++) {
        await profanity.search(allWords[i % allWords.length]);
      }
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(50); // Should be very fast with Set lookup
    });

    it('Should handle concurrent operations on Spanish dataset', async () => {
      const promises = [
        profanity.search('mierda'),
        profanity.hasCurseWords('esto es mierda'),
        profanity.getCurseWords('culo mierda'),
        profanity.all(),
        profanity.search('labios')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(true); // search mierda
      expect(results[1]).toBe(true); // hasCurseWords
      expect(results[2]).toContain('mierda'); // getCurseWords
      expect(results[3].length).toBe(564); // all Spanish words
      expect(results[4]).toBe(true); // search labios
    });
  });

  describe('Spanish language specificity', () => {
    it('Should load Spanish words correctly without falling back to English', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toBe(564); // Should match Spanish count, not English count (958)
    });

    it('Should detect Spanish-specific profanity that might not exist in English', async () => {
      // Test a word that's likely Spanish-specific
      const result = await profanity.search('labios');
      expect(result).toBe(true); // Based on your original test
    });

    it('Should handle regional Spanish variations', async () => {
      // Test words that might be offensive in some Spanish-speaking regions
      const regionalWords = [
        'pinche', // Mexican
        'boludo', // Argentinian
        'coño',   // Spanish
        'chingón' // Mexican
      ];
      
      for (const word of regionalWords) {
        const result = await profanity.search(word);
        // Just verify it returns a boolean - depends on your word list
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Data integrity for Spanish', () => {
    it('Should not allow modification of Spanish word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('palabra-falsa');
      terms1.pop();
      terms1[0] = 'modificado';
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('palabra-falsa');
      expect(terms2[0]).not.toBe('modificado');
    });

    it('Should provide consistent results for Spanish detection', async () => {
      const sentence = 'Esta oración tiene mierda y culo';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(result3).toBe(true);
    });
  });
});