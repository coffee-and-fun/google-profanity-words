import { loadTerms, resolveLanguageFilePath } from './data-loader.js';
import { extractWords, normalizeTerm } from './text-utils.js';

export class ProfanityEngine {
  constructor(config = {}) {
    this.isTestMode = config.testMode ?? false;
    this.language = config.language ?? 'en';
    this.terms = null;
    this.termsSet = null;
    this.isInitialized = false;
  }

  async _ensureInitialized() {
    if (this.isInitialized) return;

    try {
      const { filePath, fellBack } = await resolveLanguageFilePath(this.language);
      if (fellBack) {
        this._logWarning(
          `Language file '${this.language}.txt' not found. Using 'en' as fallback.`
        );
      }
      this.terms = await loadTerms(filePath);
      this.termsSet = new Set(this.terms);
    } catch (error) {
      this._logWarning(`Failed to initialize: ${error.message}`);
      this.terms = [];
      this.termsSet = new Set();
    } finally {
      this.isInitialized = true;
    }
  }

  _logWarning(message) {
    if (!this.isTestMode) {
      console.warn('Profanity Engine:', message);
    }
  }

  async hasCurseWords(sentence) {
    await this._ensureInitialized();
    if (typeof sentence !== 'string' || sentence.length === 0) return false;

    const words = extractWords(sentence);
    for (const word of words) {
      if (this.termsSet.has(word)) return true;
    }
    return false;
  }

  async getCurseWords(sentence) {
    await this._ensureInitialized();
    if (typeof sentence !== 'string' || sentence.length === 0) return [];

    const words = extractWords(sentence);
    const found = new Set();
    for (const word of words) {
      if (this.termsSet.has(word)) {
        found.add(word);
      }
    }
    return Array.from(found);
  }

  async all() {
    await this._ensureInitialized();
    return [...this.terms];
  }

  async search(term) {
    await this._ensureInitialized();
    const normalized = normalizeTerm(term);
    if (normalized.length === 0) return false;
    return this.termsSet.has(normalized);
  }

  reset() {
    this.terms = null;
    this.termsSet = null;
    this.isInitialized = false;
  }
}
