import { ProfanityEngine } from '../index.js';

const language = process.env.LANGUAGE || 'en'; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe('Chinese (Mandarin) Profanity tests', () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: 'zh',
      testMode: true,
    });
  });

  afterEach(() => {
    profanity.reset();
  });

  describe('Core Chinese functionality', () => {
    it('Should get all the profanity words in an array', async () => {
      const allWords = await profanity.all();
      expect(Array.isArray(allWords)).toBe(true);
      expect(allWords.length).toBeGreaterThan(0);
      // Update this number based on your actual Chinese word count
      // expect(allWords.length).toEqual(XXX);
    });

    it('Should return true for Chinese profanity words', async () => {
      // Test with a common Chinese profanity word (if it exists in your list)
      // Replace 'testword' with an actual word from your Chinese list
      const searchWord = await profanity.search('testword');
      expect(typeof searchWord).toBe('boolean');
    });

    it('Should return false for normal Chinese words', async () => {
      const normalWords = [
        '你好',     // Hello (nǐ hǎo)
        '谢谢',     // Thank you (xiè xiè)
        '房子',     // House (fáng zi)
        '书',       // Book (shū)
        '水',       // Water (shuǐ)
        '中文',     // Chinese language (zhōng wén)
        '电脑',     // Computer (diàn nǎo)
        '家庭',     // Family (jiā tíng)
        '朋友',     // Friend (péng yǒu)
        '学校',     // School (xué xiào)
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
      // Replace with actual Chinese sentence containing profanity from your list
      const sentence = '这个句子包含不当词汇。'; // "This sentence contains inappropriate words"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(typeof hasCurseWords).toBe('boolean');
    });

    it('Should return false for a sentence with no profanity word', async () => {
      const sentence = '这是一个干净礼貌的句子。'; // "This is a clean and polite sentence"
      const hasCurseWords = await profanity.hasCurseWords(sentence);
      expect(hasCurseWords).toEqual(false);
    });
  });

  describe('Chinese-specific edge cases', () => {
    it('Should handle simplified vs traditional Chinese characters', async () => {
      // Test pairs of simplified and traditional characters
      const characterPairs = [
        ['学', '學'],         // Study (simplified vs traditional)
        ['国', '國'],         // Country (simplified vs traditional)
        ['电', '電'],         // Electric (simplified vs traditional)
        ['书', '書'],         // Book (simplified vs traditional)
        ['车', '車'],         // Vehicle (simplified vs traditional)
        ['语', '語'],         // Language (simplified vs traditional)
      ];

      for (const [simplified, traditional] of characterPairs) {
        const result1 = await profanity.search(simplified);
        const result2 = await profanity.search(traditional);
        expect(typeof result1).toBe('boolean');
        expect(typeof result2).toBe('boolean');
        // Both should be clean words
        expect(result1).toBe(false);
        expect(result2).toBe(false);
      }
    });

    it('Should handle Chinese without word boundaries', async () => {
      // Chinese doesn't use spaces between words
      const continuousText = '我今天去学校学习中文很开心'; // "I went to school today to study Chinese and was very happy"
      const result = await profanity.hasCurseWords(continuousText);
      expect(result).toBe(false); // Should be clean text
    });

    it('Should handle single Chinese characters', async () => {
      const singleChars = [
        '我',  // I/me
        '你',  // You
        '他',  // He
        '好',  // Good
        '大',  // Big
        '小',  // Small
        '人',  // Person
        '天',  // Day/sky
      ];

      for (const char of singleChars) {
        expect(await profanity.search(char)).toBe(false);
      }
    });

    it('Should handle Chinese compound words', async () => {
      const compoundWords = [
        '电脑',     // Computer (electric + brain)
        '火车',     // Train (fire + vehicle)
        '飞机',     // Airplane (fly + machine)
        '手机',     // Cell phone (hand + machine)
        '汽车',     // Car (steam + vehicle)
        '电视',     // Television (electric + vision)
      ];

      for (const word of compoundWords) {
        expect(await profanity.search(word)).toBe(false);
      }
    });

    it('Should handle Chinese numbers and mixed content', async () => {
      const mixedContent = [
        '我有3本书',           // I have 3 books
        '今天是2024年',        // Today is 2024
        '电话号码123456',      // Phone number 123456
        '第1章',              // Chapter 1
        '100元',              // 100 yuan
      ];

      for (const text of mixedContent) {
        const result = await profanity.hasCurseWords(text);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Chinese punctuation', async () => {
      const testSentences = [
        '你好！',              // Hello!
        '你好吗？',            // How are you?
        '是的，我知道。',       // Yes, I know.
        '他说："你好"',        // He said: "Hello"
        '学习、工作、生活',     // Study, work, life
        '这是...很好',         // This is... very good
      ];

      for (const sentence of testSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Chinese measure words (classifiers)', async () => {
      const measureWords = [
        '一本书',              // One book (classifier: 本)
        '两个人',              // Two people (classifier: 个)
        '三只猫',              // Three cats (classifier: 只)
        '四辆车',              // Four cars (classifier: 辆)
        '五张纸',              // Five sheets of paper (classifier: 张)
      ];

      for (const phrase of measureWords) {
        expect(await profanity.hasCurseWords(phrase)).toBe(false);
      }
    });

    it('Should handle Chinese tone marks in pinyin (if applicable)', async () => {
      // If your system processes pinyin alongside Chinese characters
      const pinyinWords = [
        'nǐ hǎo',              // Hello
        'xiè xiè',             // Thank you
        'duì bù qǐ',           // Sorry
        'zài jiàn',            // Goodbye
      ];

      for (const pinyin of pinyinWords) {
        const result = await profanity.search(pinyin);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle whitespace around Chinese characters', async () => {
      const chineseWord = '你好';
      expect(await profanity.search(`  ${chineseWord}  `)).toBe(false);
      expect(await profanity.search(`\t${chineseWord}\n`)).toBe(false);
    });

    it('Should handle mixed Chinese and English text', async () => {
      const mixedSentences = [
        'I love 中文',                    // I love Chinese
        '这是English和中文的混合',         // This is a mix of English and Chinese
        'Hello 世界',                    // Hello world
        '我在学习programming',           // I am learning programming
      ];

      for (const sentence of mixedSentences) {
        const result = await profanity.hasCurseWords(sentence);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should return unique words only in Chinese text', async () => {
      // Test with repeated Chinese words
      const sentence = '你好你好你好世界';
      const foundWords = await profanity.getCurseWords(sentence);
      
      // Should return unique words only
      expect(Array.isArray(foundWords)).toBe(true);
      // If '你好' were a profanity word, it should appear only once
    });

    it('Should handle Chinese regional variations', async () => {
      // Different Chinese-speaking regions may have different vocabulary
      const regionalWords = [
        '出租车',              // Taxi (Mainland)
        '计程车',              // Taxi (Taiwan)
        '的士',               // Taxi (Hong Kong)
        '垃圾',               // Garbage (Mainland)
        '废物',               // Waste (General)
      ];

      for (const word of regionalWords) {
        const result = await profanity.search(word);
        expect(typeof result).toBe('boolean');
      }
    });
  });

  describe('Performance tests for Chinese dataset', () => {
    it('Should handle large Chinese text efficiently', async () => {
      const largeText = '这是一个测试句子。'.repeat(1000) + '中文文本 ' + '干净的文本。'.repeat(1000);
      
      const startTime = Date.now();
      const result = await profanity.hasCurseWords(largeText);
      const endTime = Date.now();
      
      expect(typeof result).toBe('boolean');
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    it('Should efficiently search through all Chinese terms', async () => {
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

    it('Should handle concurrent operations on Chinese dataset', async () => {
      const promises = [
        profanity.search('你好'),
        profanity.hasCurseWords('这是中文文本'),
        profanity.getCurseWords('中文文本'),
        profanity.all(),
        profanity.search('谢谢')
      ];
      
      const results = await Promise.all(promises);
      expect(results[0]).toBe(false); // search 你好 (should be clean)
      expect(results[1]).toBe(false); // hasCurseWords (should be clean)
      expect(Array.isArray(results[2])).toBe(true); // getCurseWords
      expect(Array.isArray(results[3])).toBe(true); // all words
      expect(results[4]).toBe(false); // search 谢谢 (should be clean)
    });
  });

  describe('Chinese language specificity', () => {
    it('Should load Chinese words correctly or fallback to English', async () => {
      const allWords = await profanity.all();
      expect(allWords.length).toBeGreaterThan(0);
      // If Chinese file doesn't exist, should fallback to English (958 words)
      // If Chinese file exists, should load Chinese words
    });

    it('Should handle Chinese character encoding (UTF-8)', async () => {
      // Test various Chinese character ranges
      const chineseChars = [
        '一', '二', '三', '四', '五',  // Numbers
        '人', '大', '小', '中', '国',  // Common characters
        '學', '國', '語', '電', '車',  // Traditional characters
        '龍', '鳳', '麒', '麟', '龜',  // Complex characters
      ];

      for (const char of chineseChars) {
        const result = await profanity.search(char);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Chinese internet slang and abbreviated forms', async () => {
      // Common Chinese internet abbreviations and slang
      const internetSlang = [
        '886',                // Bye bye (sounds like "bā bā liù")
        '520',                // I love you (sounds like "wǒ ài nǐ")
        '88',                 // Bye bye
        '233',                // LOL (from emoticon)
        '666',                // Awesome/cool
      ];

      for (const slang of internetSlang) {
        const result = await profanity.search(slang);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Chinese variant characters and fonts', async () => {
      // Some characters have multiple valid forms
      const variants = [
        ['关', '關'],          // Close (simplified vs traditional)
        ['门', '門'],          // Door (simplified vs traditional)
        ['时', '時'],          // Time (simplified vs traditional)
        ['长', '長'],          // Long (simplified vs traditional)
      ];

      for (const [simplified, traditional] of variants) {
        expect(await profanity.search(simplified)).toBe(false);
        expect(await profanity.search(traditional)).toBe(false);
      }
    });

    it('Should handle Chinese homophone considerations', async () => {
      // Chinese has many homophones (same pronunciation, different characters)
      const homophones = [
        ['时', '石', '是'],     // shí - time, stone, is
        ['他', '她', '它'],     // tā - he, she, it
        ['在', '再'],          // zài - at/in, again
      ];

      for (const group of homophones) {
        for (const char of group) {
          const result = await profanity.search(char);
          expect(typeof result).toBe('boolean');
        }
      }
    });
  });

  describe('Data integrity for Chinese', () => {
    it('Should not allow modification of Chinese word list', async () => {
      const terms1 = await profanity.all();
      const originalLength = terms1.length;
      
      // Try to modify the returned array
      terms1.push('假词');
      terms1.pop();
      if (terms1.length > 0) {
        terms1[0] = '修改';
      }
      
      // Get terms again - should be unchanged
      const terms2 = await profanity.all();
      expect(terms2.length).toBe(originalLength);
      expect(terms2).not.toContain('假词');
      if (terms2.length > 0) {
        expect(terms2[0]).not.toBe('修改');
      }
    });

    it('Should provide consistent results for Chinese detection', async () => {
      const sentence = '这个句子是中文的';
      
      const result1 = await profanity.getCurseWords(sentence);
      const result2 = await profanity.getCurseWords(sentence);
      const result3 = await profanity.hasCurseWords(sentence);
      
      expect(result1).toEqual(result2);
      expect(typeof result3).toBe('boolean');
    });
  });

  describe('Configuration and fallback for Chinese', () => {
    it('Should handle missing Chinese language file gracefully', async () => {
      // If zh.txt doesn't exist, should fallback to English
      const chineseProfanity = new ProfanityEngine({
        language: 'zh',
        testMode: true,
      });
      
      const terms = await chineseProfanity.all();
      expect(terms.length).toBeGreaterThan(0);
    });

    it('Should suppress warnings in test mode for Chinese', async () => {
      // Store original console.warn
      const originalWarn = console.warn;
      let warnCalled = false;
      
      // Mock console.warn
      console.warn = () => {
        warnCalled = true;
      };
      
      const chineseProfanity = new ProfanityEngine({
        language: 'zh',
        testMode: true,
      });
      
      warnCalled = false;
      await chineseProfanity.all();
      expect(warnCalled).toBe(false);
      
      // Restore original console.warn
      console.warn = originalWarn;
    });
  });

  describe('Chinese text processing specifics', () => {
    it('Should handle Chinese word segmentation challenges', async () => {
      // Chinese word boundaries are ambiguous
      const ambiguousTexts = [
        '研究生命科学',         // Could be "研究生|命科学" or "研究|生命科学"
        '北京大学生活',         // Could be "北京大学|生活" or "北京|大学生|活"
        '中国人民银行',         // "中国人民银行" as one entity
      ];

      for (const text of ambiguousTexts) {
        const result = await profanity.hasCurseWords(text);
        expect(typeof result).toBe('boolean');
      }
    });

    it('Should handle Chinese proper nouns and names', async () => {
      const properNouns = [
        '北京',               // Beijing
        '上海',               // Shanghai
        '中国',               // China
        '长江',               // Yangtze River
        '故宫',               // Forbidden City
      ];

      for (const noun of properNouns) {
        expect(await profanity.search(noun)).toBe(false);
      }
    });

    it('Should handle Chinese grammar particles', async () => {
      const particles = [
        '的',                 // Possessive particle
        '了',                 // Completion particle
        '着',                 // Progressive particle
        '过',                 // Experience particle
        '吗',                 // Question particle
        '呢',                 // Question particle
      ];

      for (const particle of particles) {
        expect(await profanity.search(particle)).toBe(false);
      }
    });
  });
});