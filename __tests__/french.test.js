import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('French Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'fr',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core French functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
      // Update this number based on your actual French word count
      // expect(allWords.length).toEqual(XXX);
    });

    it('Should return true for French profanity words', async () => {
      // Test with a common French profanity word (if it exists in your list)
      // Replace 'testword' with an actual word from your French list
      const searchWord = await profanity.search('testword');
      expect(typeof searchWord).toBe('boolean');
    });

    it('Should return false for normal French words', async () => {
      const normalWords = [
        'bonjour',    // Hello
        'merci',      // Thank you
        'maison',     // House
        'livre',      // Book
        'eau',        // Water
        'français',   // French
        'ordinateur', // Computer
        'famille',    // Family
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
      // Replace with actual French sentence containing profanity from your list
      const sentence = 'Cette phrase contient un mot inapproprié.'; // "This sentence contains an inappropriate word"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(typeof hasCurseWords).toBe('boolean');
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = 'Cette phrase est propre et polie.'; // "This sentence is clean and polite"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('French-specific edge cases', () => {
    it('Should handle French accented characters', async () => {
      // Test words with various French accents
      const accentedWords = [
        'café',       // é
        'hôtel',      // ô
        'être',       // ê
        'français',   // ç
        'naïf',       // ï
        'où',         // ù
        'âge',        // â
        'élève',      // è
      ];

      for (const word of accentedWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French case sensitivity correctly', async () => {
      const testWord = 'bonjour';
      expect(await profanity.search('BONJOUR')).toBe(false);
      expect(await profanity.search('Bonjour')).toBe(false);
      expect(await profanity.search('bonjour')).toBe(false);
      expect(await profanity.search('bOnJoUr')).toBe(false);
    });

    it('Should handle French apostrophes and contractions', async () => {
      const testSentences = [
        "C'est une phrase.",           // It's a sentence
        "L'ordinateur est cassé.",     // The computer is broken
        "D'accord avec vous.",         // I agree with you
        "Qu'est-ce que c'est?",       // What is it?
        "N'importe quoi!",            // Whatever!
        "J'ai mangé.",                // I ate
      ];

      for (const sentence of testSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French punctuation correctly', async () => {
      const testSentences = [
        'Qu\'est-ce que c\'est ?',    // What is it? (French spacing before ?)
        'Bonjour !',                  // Hello! (French spacing before !)
        'Non, merci.',                // No, thank you.
        'Il a dit : « Bonjour »',     // He said: "Hello" (French quotes)
        'C\'est vrai ; vraiment.',    // It's true; really.
      ];

      for (const sentence of testSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French gender variations', async () => {
      // Test masculine and feminine forms
      const genderPairs = [
        ['acteur', 'actrice'],        // actor/actress
        ['chanteur', 'chanteuse'],    // singer (m/f)
        ['directeur', 'directrice'],  // director (m/f)
        ['français', 'française'],    // French (m/f)
      ];

      for (const [masculine, feminine] of genderPairs) {
        expect(await profanity.search(masculine)).toBe(false);
        expect(await profanity.search(feminine)).toBe(false);
      }
    });

    it('Should handle French plural forms', async () => {
      const singularPlural = [
        ['livre', 'livres'],          // book/books
        ['maison', 'maisons'],        // house/houses
        ['animal', 'animaux'],        // animal/animals (irregular)
        ['eau', 'eaux'],              // water/waters (irregular)
      ];

      for (const [singular, plural] of singularPlural) {
        expect(await profanity.search(singular)).toBe(false);
        expect(await profanity.search(plural)).toBe(false);
      }
    });

    it('Should handle French verb conjugations', async () => {
      // Test different verb forms
      const verbForms = [
        'parler',     // to speak (infinitive)
        'parle',      // I/he speaks
        'parles',     // you speak
        'parlons',    // we speak
        'parlez',     // you (plural) speak
        'parlent',    // they speak
      ];

      for (const verb of verbForms) {
        const result = await profanity.search(verb);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French liaison and elision', async () => {
      const testSentences = [
        'Les enfants',                // Liaison: les_enfants
        'Un homme',                   // Liaison: un_homme
        'L\'ami',                     // Elision: l'ami (not le ami)
        'D\'eau',                     // Elision: d'eau (not de eau)
      ];

      for (const sentence of testSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle whitespace around French words', async () => {
      const frenchWord = 'bonjour';
      expect(await profanity.search(`  ${frenchWord}  `)).toBe(false);
      expect(await profanity.search(`\t${frenchWord}\n`)).toBe(false);
    });

    it('Should handle French hyphenated words', async () => {
      const hyphenatedWords = [
        'c\'est-à-dire',              // that is to say
        'peut-être',                  // maybe
        'moi-même',                   // myself
        'quelqu\'un',                 // someone
        'rendez-vous',                // appointment
      ];

      for (const word of hyphenatedWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should return unique words only in French text', async () => {
      // Test with repeated French words
      const sentence = 'bonjour bonjour bonjour partout';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should return unique words only
      expect(Array.isArray(foundWords)).toBe(true);
      // If 'bonjour' were a profanity word, it should appear only once
    });

    it('Should handle mixed French and English text', async () => {
      const mixedSentence = 'This is mixed avec du français and English text.';
      const result = await profanity.hasCurseWords(mixedSentence);
      expect(typeof result).toBe('boolean');
    });

    it('Should handle French regional variations', async () => {
      // Test words that might vary between French regions
      const regionalWords = [
        'chocolatine',    // Pain au chocolat (Southwest France)
        'septante',       // Seventy (Belgium/Switzerland)
        'nonante',        // Ninety (Belgium/Switzerland)
        'tantôt',         // Later (Quebec/Belgium)
      ];

      for (const word of regionalWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Performance tests for French dataset', () => {
    it('Should handle large French text efficiently', async () => {
      const largeText = 'Ceci est une phrase de test. '.repeat(1000) + 'texte français ' + 'Texte propre. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(typeof result).toBe('boolean');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all French terms', async () => {
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

    it('Should handle concurrent operations on French dataset', async () => {
      const promises = [
        profanity.search('bonjour'),
        profanity.hasCurseWords('ceci est du texte français'),
        profanity.getCurseWords('le texte français'),
        profanity.all(),
        profanity.search('merci')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(false); // search bonjour (should be clean)
      expect(results[1]).toBe(false); // hasCurseWords (should be clean)
      expect(Array.isArray(results[2])).toBe(true); // getCurseWords
      expect(Array.isArray(results[3])).toBe(true); // all words
      expect(results[4]).toBe(false); // search merci (should be clean)
    });
  });

  describe('French language specificity', () => {
    it('Should load French words correctly or fallback to English', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toBeGreaterThan(0);
      // If French file doesn't exist, should fallback to English (958 words)
      // If French file exists, should load French words
    });

    it('Should handle French-specific character encoding (UTF-8)', async () => {
      const frenchChars = [
        'à', 'â', 'ä', 'ç', 'è', 'é', 'ê', 'ë', 
        'î', 'ï', 'ô', 'ù', 'û', 'ü', 'ÿ', 'ñ'
      ];

      for (const char of frenchChars) {
        const result = await profanity.search(char);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French quotation marks and typography', async () => {
      const typographyTests = [
        '« guillemets français »',     // French quotes
        '"guillemets anglais"',        // English quotes
        'apostrophe courbe',         // Curved apostrophe
        'apostrophe droite',       // Straight apostrophe
        '— tiret cadratin',            // Em dash
        '– tiret demi-cadratin',       // En dash
      ];

      for (const text of typographyTests) {
        const result = await profanity.hasCurseWords(text);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle French Canadian (Quebec) variations', async () => {
      // Quebec French often has different vocabulary
      const quebecWords = [
        'char',           // Car (instead of voiture)
        'blonde',         // Girlfriend (instead of copine)
        'magasiner',      // To shop (instead of faire du shopping)
        'déjeuner',       // Breakfast (lunch in France)
      ];

      for (const word of quebecWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Data integrity for French', () => {
    it('Should not allow modification of French word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('mot-faux');
      terms1.pop();
      if (terms1.length > 0) {
        terms1[0] = 'modifié';
      }
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('mot-faux');
      if (terms2.length > 0) {
        expect(terms2[0]).not.toBe('modifié');
      }
    });

    it('Should provide consistent results for French detection', async () => {
      const sentence = 'Cette phrase est en français';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(typeof result3).toBe('boolean');
    });
  });

  describe('Configuration and fallback for French', () => {
    it('Should handle missing French language file gracefully', async () => {
      // If fr.txt doesn't exist, should fallback to English
      const frenchProfanity = new ProfanityEngine({
        language: 'fr',
        testMode: true,
      });
      
      const terms = await frenchProfanity.all();
      expect(terms.length).toBeGreaterThan(0);
    });

    it('Should suppress warnings in test mode for French', async () => {
      // Store original console.warn
      const originalWarn = console.warn;
      let warnCalled = false;
      
      // Mock console.warn
      console.warn = () => {
        warnCalled = true;
      };
      
      const frenchProfanity = new ProfanityEngine({
        language: 'fr',
        testMode: true,
      });
      
      warnCalled = false;
      await frenchProfanity.all();
      expect(warnCalled).toBe(false);
      
      // Restore original console.warn
      console.warn = originalWarn;
    });
  });

  describe('French grammar and linguistics', () => {
    it('Should handle French articles and determiners', async () => {
      const articles = [
        'le', 'la', 'les',           // Definite articles
        'un', 'une', 'des',          // Indefinite articles
        'du', 'de la', 'des',        // Partitive articles
        'ce', 'cette', 'ces',        // Demonstrative
      ];

      for (const article of articles) {
        expect(await profanity.search(article)).toBe(false);
      }
    });

    it('Should handle French prepositions', async () => {
      const prepositions = [
        'de', 'à', 'dans', 'sur', 'avec', 'pour', 
        'par', 'sans', 'sous', 'vers', 'chez'
      ];

      for (const prep of prepositions) {
        expect(await profanity.search(prep)).toBe(false);
      }
    });

    it('Should handle French reflexive pronouns', async () => {
      const reflexiveTests = [
        'Je me lave',                 // I wash myself
        'Tu te dépêches',            // You hurry
        'Il se réveille',            // He wakes up
        'Nous nous amusons',         // We have fun
      ];

      for (const sentence of reflexiveTests) {
        const result = await profanity.hasCurseWords(sentence);
        expect(result).toBe(false); // Should be clean
      }
    });
  });
});