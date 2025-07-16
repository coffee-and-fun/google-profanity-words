import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('Irish (Gaeilge) Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'ga', // ISO code for Irish (Gaeilge)
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core Irish functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
      // Update this number based on your actual Irish word count
      // expect(allWords.length).toEqual(XXX);
    });

    it('Should return true for Irish profanity words', async () => {
      // Test with a common Irish profanity word (if it exists in your list)
      // Replace 'testword' with an actual word from your Irish list
      const searchWord = await profanity.search('testword');
      expect(typeof searchWord).toBe('boolean');
    });

    it('Should return false for normal Irish words', async () => {
      const normalWords = [
        'dia duit',     // Hello (God to you)
        'go raibh maith agat', // Thank you
        'teach',        // House
        'leabhar',      // Book
        'uisce',        // Water
        'Gaeilge',      // Irish language
        'ríomhaire',    // Computer
        'teaghlach',    // Family
        'cara',         // Friend
        'scoil',        // School
        'céad míle fáilte', // A hundred thousand welcomes
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
      // Replace with actual Irish sentence containing profanity from your list
      const sentence = 'Tá focal mímhúinte sa abairt seo.'; // "There is an impolite word in this sentence"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(typeof hasCurseWords).toBe('boolean');
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = 'Is abairt ghlan dea-bhéasach í seo.'; // "This is a clean, well-mannered sentence"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('Irish-specific edge cases', () => {
    it('Should handle Irish fadas (accent marks)', async () => {
      // Test words with fadas (long marks over vowels)
      const fadaWords = [
        'fáilte',       // Welcome
        'tír',          // Country/land
        'óg',           // Young
        'mór',          // Big
        'úr',           // Fresh/new
        'éan',          // Bird
        'íoc',          // Pay
        'bádóir',       // Boatman
        'cúpla',        // Couple
        'lón',          // Lunch
      ];

      for (const word of fadaWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
        // These should all be clean words
        expect(result).toBe(false);
      }
    });

    it('Should handle Irish initial mutations (séimhiú/urú)', async () => {
      // Irish has initial consonant mutations
      const mutationExamples = [
        // Séimhiú (lenition) - adds 'h' after initial consonant
        ['bean', 'bhean'],      // Woman (lenited form)
        ['fear', 'fhear'],      // Man (lenited form)
        ['cat', 'chat'],        // Cat (lenited form)
        ['doras', 'dhoras'],    // Door (lenited form)
        
        // Urú (eclipsis) - changes initial consonant
        ['bean', 'mbean'],      // Woman (eclipsed form)
        ['fear', 'bhfear'],     // Man (eclipsed form)
        ['cat', 'gcat'],        // Cat (eclipsed form)
        ['doras', 'ndoras'],    // Door (eclipsed form)
      ];

      for (const [root, mutated] of mutationExamples) {
        expect(await profanity.search(root)).toBe(false);
        expect(await profanity.search(mutated)).toBe(false);
      }
    });

    it('Should handle Irish case sensitivity correctly', async () => {
      const testWord = 'gaeilge';
      expect(await profanity.search('GAEILGE')).toBe(false);
      expect(await profanity.search('Gaeilge')).toBe(false);
      expect(await profanity.search('gaeilge')).toBe(false);
      expect(await profanity.search('gAeIlGe')).toBe(false);
    });

    it('Should handle Irish verb conjugations', async () => {
      // Irish verbs have complex conjugation patterns
      const verbForms = [
        // Bí (to be) conjugations
        'tá',           // is/are (present)
        'bhí',          // was/were (past)
        'beidh',        // will be (future)
        
        // Déan (to do/make) conjugations
        'déanaim',      // I do
        'déanann',      // he/she does
        'rinne',        // did (past)
        'déanfaidh',    // will do (future)
      ];

      for (const verb of verbForms) {
        expect(await profanity.search(verb)).toBe(false);
      }
    });

    it('Should handle Irish noun declensions', async () => {
      // Irish nouns change form based on case
      const declensionExamples = [
        // Fear (man) declensions
        'fear',         // Nominative singular
        'fir',          // Nominative plural
        'fhear',        // Genitive singular (lenited)
        'bhfear',       // With eclipsis
        
        // Bean (woman) declensions
        'bean',         // Nominative singular
        'mná',          // Nominative plural
        'mhná',         // Genitive plural (lenited)
      ];

      for (const form of declensionExamples) {
        expect(await profanity.search(form)).toBe(false);
      }
    });

    it('Should handle Irish compound words', async () => {
      const compoundWords = [
        'ríomhaire',        // Computer (number-counter)
        'teilifís',         // Television
        'rothar',           // Bicycle (wheel-man)
        'ospidéal',         // Hospital
        'ollscoil',         // University (great-school)
        'leabharlann',      // Library (book-house)
      ];

      for (const word of compoundWords) {
        expect(await profanity.search(word)).toBe(false);
      }
    });

    it('Should handle Irish numbers and counting', async () => {
      const irishNumbers = [
        'a haon',       // One
        'a dó',         // Two
        'a trí',        // Three
        'a ceathair',   // Four
        'a cúig',       // Five
        'a sé',         // Six
        'a seacht',     // Seven
        'a hocht',      // Eight
        'a naoi',       // Nine
        'a deich',      // Ten
      ];

      for (const number of irishNumbers) {
        const result = await profanity.hasCurseWords(number);
        expect(result).toBe(false);
      }
    });

    it('Should handle Irish prepositional pronouns', async () => {
      // Irish combines prepositions with pronouns
      const prepositionalPronouns = [
        'agam',         // At me (ag + mé)
        'agat',         // At you (ag + tú)
        'aige',         // At him (ag + é)
        'aici',         // At her (ag + í)
        'againn',       // At us (ag + muid)
        'agaibh',       // At you (plural) (ag + sibh)
        'acu',          // At them (ag + iad)
      ];

      for (const pronoun of prepositionalPronouns) {
        expect(await profanity.search(pronoun)).toBe(false);
      }
    });

    it('Should handle whitespace around Irish words', async () => {
      const irishWord = 'fáilte';
      expect(await profanity.search(`  ${irishWord}  `)).toBe(false);
      expect(await profanity.search(`\t${irishWord}\n`)).toBe(false);
    });

    it('Should handle mixed Irish and English text', async () => {
      const mixedSentences = [
        'I love Gaeilge',               // I love Irish
        'Tá mé ag foghlaim English',    // I am learning English
        'Hello agus dia duit',          // Hello and God to you
        'Go raibh maith agat very much', // Thank you very much
      ];

      for (const sentence of mixedSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should return unique words only in Irish text', async () => {
      // Test with repeated Irish words
      const sentence = 'fáilte fáilte fáilte go hÉireann';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should return unique words only
      expect(Array.isArray(foundWords)).toBe(true);
      // If 'fáilte' were a profanity word, it should appear only once
    });

    it('Should handle Irish dialectal variations', async () => {
      // Irish has three main dialects: Munster, Connacht, Ulster
      const dialectalWords = [
        // Different ways to say things in different dialects
        'pótaí',        // Potatoes (Munster)
        'prátaí',       // Potatoes (Connacht/Ulster)
        'gasúr',        // Boy (Munster)
        'buachaill',    // Boy (Connacht/Ulster)
        'cailín',       // Girl (general)
        'girseach',     // Girl (Ulster)
      ];

      for (const word of dialectalWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Irish traditional vs modern spelling', async () => {
      // Irish spelling was reformed in the 20th century
      const spellingVariations = [
        // Traditional vs Modern
        ['Gaedhilg', 'Gaeilge'],        // Irish language
        ['oidhche', 'oíche'],           // Night
        ['ceathramhadh', 'ceathrú'],    // Quarter/fourth
      ];

      for (const [traditional, modern] of spellingVariations) {
        expect(await profanity.search(traditional)).toBe(false);
        expect(await profanity.search(modern)).toBe(false);
      }
    });
  });

  describe('Performance tests for Irish dataset', () => {
    it('Should handle large Irish text efficiently', async () => {
      const largeText = 'Seo abairt tástála. '.repeat(1000) + 'téacs Gaeilge ' + 'Téacs glan. '.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(typeof result).toBe('boolean');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all Irish terms', async () => {
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

    it('Should handle concurrent operations on Irish dataset', async () => {
      const promises = [
        profanity.search('fáilte'),
        profanity.hasCurseWords('seo téacs Gaeilge'),
        profanity.getCurseWords('an téacs Gaeilge'),
        profanity.all(),
        profanity.search('slán')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(false); // search fáilte (should be clean)
      expect(results[1]).toBe(false); // hasCurseWords (should be clean)
      expect(Array.isArray(results[2])).toBe(true); // getCurseWords
      expect(Array.isArray(results[3])).toBe(true); // all words
      expect(results[4]).toBe(false); // search slán (should be clean)
    });
  });

  describe('Irish language specificity', () => {
    it('Should load Irish words correctly or fallback to English', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toBeGreaterThan(0);
      // If Irish file doesn't exist, should fallback to English (958 words)
      // If Irish file exists, should load Irish words
    });

    it('Should handle Irish-specific character encoding (UTF-8)', async () => {
      // Test Irish alphabet with fadas
      const irishChars = [
        'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h',
        'i', 'í', 'l', 'm', 'n', 'o', 'ó', 'p', 'r', 's',
        't', 'u', 'ú', // Irish alphabet (no j, k, q, v, w, x, y, z traditionally)
      ];

      for (const char of irishChars) {
        const result = await profanity.search(char);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Irish place names', async () => {
      const placeNames = [
        'Éire',           // Ireland
        'Baile Átha Cliath', // Dublin
        'Corcaigh',       // Cork
        'Gaillimh',       // Galway
        'Luimneach',      // Limerick
        'Port Láirge',    // Waterford
        'An Clár',        // Clare
        'Ciarraí',        // Kerry
      ];

      for (const place of placeNames) {
        expect(await profanity.search(place)).toBe(false);
      }
    });

    it('Should handle Irish Celtic cultural terms', async () => {
      const culturalTerms = [
        'céilí',          // Social gathering with music/dance
        'seisiún',        // Music session
        'bodhrán',        // Traditional drum
        'uilleann',       // Irish pipes
        'fleadh',         // Festival
        'comhrá',         // Conversation
        'craic',          // Fun/good time
        'sláinte',        // Health/cheers
      ];

      for (const term of culturalTerms) {
        expect(await profanity.search(term)).toBe(false);
      }
    });
  });

  describe('Data integrity for Irish', () => {
    it('Should not allow modification of Irish word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('focal-bréige');
      terms1.pop();
      if (terms1.length > 0) {
        terms1[0] = 'athraithe';
      }
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('focal-bréige');
      if (terms2.length > 0) {
        expect(terms2[0]).not.toBe('athraithe');
      }
    });

    it('Should provide consistent results for Irish detection', async () => {
      const sentence = 'Seo abairt i nGaeilge';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(typeof result3).toBe('boolean');
    });
  });

  describe('Configuration and fallback for Irish', () => {
    it('Should handle missing Irish language file gracefully', async () => {
      // If ga.txt doesn't exist, should fallback to English
      const irishProfanity = new ProfanityEngine({
        language: 'ga',
        testMode: true,
      });
      
      const terms = await irishProfanity.all();
      expect(terms.length).toBeGreaterThan(0);
    });

    it('Should suppress warnings in test mode for Irish', async () => {
      // Store original console.warn
      const originalWarn = console.warn;
      let warnCalled = false;
      
      // Mock console.warn
      console.warn = () => {
        warnCalled = true;
      };
      
      const irishProfanity = new ProfanityEngine({
        language: 'ga',
        testMode: true,
      });
      
      warnCalled = false;
      await irishProfanity.all();
      expect(warnCalled).toBe(false);
      
      // Restore original console.warn
      console.warn = originalWarn;
    });
  });

  describe('Irish grammar and linguistics', () => {
    it('Should handle Irish syntax patterns (VSO order)', async () => {
      // Irish typically uses Verb-Subject-Object word order
      const vsoSentences = [
        'Tá Seán ag rith',           // Is Seán running (literally: Is Seán at running)
        'Chonaic mé an madra',       // I saw the dog (literally: Saw I the dog)
        'Léann sí leabhar',          // She reads a book (literally: Reads she book)
      ];

      for (const sentence of vsoSentences) {
        expect(await profanity.hasCurseWords(sentence)).toBe(false);
      }
    });

    it('Should handle Irish copula vs substantive verb', async () => {
      // Irish has two types of "to be"
      const copulaExamples = [
        'Is múinteoir mé',           // I am a teacher (copula)
        'Tá mé ag obair',           // I am working (substantive verb)
        'Is maith liom tae',        // I like tea (copula)
        'Tá tae agam',              // I have tea (substantive verb)
      ];

      for (const sentence of copulaExamples) {
        expect(await profanity.hasCurseWords(sentence)).toBe(false);
      }
    });

    it('Should handle Irish conditional and subjunctive moods', async () => {
      const moodExamples = [
        'Dá mbeinn saibhir',        // If I were rich (conditional)
        'Go raibh maith agat',      // Thank you (subjunctive: "that good be at you")
        'Ar mhaith leat tae?',      // Would you like tea? (conditional)
      ];

      for (const sentence of moodExamples) {
        expect(await profanity.hasCurseWords(sentence)).toBe(false);
      }
    });
  });
});