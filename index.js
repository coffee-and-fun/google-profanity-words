import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export class ProfanityEngine {
  constructor(config) {
    this.isTestMode = config && config.testMode ? config.testMode : false;
    this.language = config && config.language ? config.language : 'en';
    this.terms = [];
    this.filePath = '';
  }

  async initialize() {
    this.filePath = await this.getLanguageFilePath(this.language);
    try {
      const fileContent = await this.readFileAndSplit(this.filePath);
      this.terms = fileContent;
    } catch (err) {
      if (this.isTestMode === false) {
        let message = `Error reading file: ${err.message}`;
        console.warn('Profanity words issue:', message);
      }
      this.terms = [];
    }
  }

  async getLanguageFilePath(language) {
    const currentFilePath = fileURLToPath(import.meta.url);
    const dataFolderPath = path.join(path.dirname(currentFilePath), 'data');
    const languageFilePath = path.join(dataFolderPath, `${language}.txt`);
    const fileExists = await this.fileExists(languageFilePath);

    if (!fileExists) {
      if (this.isTestMode === false) {
        let message = `Warning: The ${language} language file could not be found. Defaulting to 'en' language.`;
        console.warn('Profanity words issue:', message);
      }
      return path.join(dataFolderPath, 'en.txt');
    }

    return languageFilePath;
  }

  async fileExists(filePath) {
    try {
      await readFile(filePath);
      return true;
    } catch (err) {
      return false;
    }
  }

  async readFileAndSplit(filePath) {
    try {
      const fileContent = await readFile(filePath, 'utf8');
      return fileContent.split('\n');
    } catch (err) {
      if (this.isTestMode === false) {
        console.warn('Profanity words issue:', err);
      }
      return [];
    }
  }

  async hasCurseWords(sentence) {
    if (this.terms.length === 0) {
      await this.initialize();
    }

    const wordsInSentence = sentence.split(/\s+/);
    const lowerCasedTerms = this.terms.map((term) => term.toLowerCase());

    for (const word of wordsInSentence) {
      const lowerCasedWord = word.toLowerCase();
      if (lowerCasedTerms.includes(lowerCasedWord)) {
        return true;
      }
    }

    return false;
  }

  async getCurseWords(sentence) {
    if (this.terms.length === 0) {
      await this.initialize();
    }

    let foundCurseWords = [];

    const wordsInSentence = sentence.split(/\s+/);
    const lowerCasedTerms = this.terms.map((term) => term.toLowerCase());

    for (const word of wordsInSentence) {
      const lowerCasedWord = word.toLowerCase();
      if (lowerCasedTerms.includes(lowerCasedWord)) {
        foundCurseWords.push(word);
      }
    }

    return foundCurseWords;
  }

  async all() {
    if (this.terms.length === 0) {
      await this.initialize();
    }

    return this.terms;
  }

  async search(term) {
    if (this.terms.length === 0) {
      await this.initialize();
    }

    return this.terms.includes(term);
  }
}
