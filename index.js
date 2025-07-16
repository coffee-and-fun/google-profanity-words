
import { readFile, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Supports multiple languages and provides efficient word matching
 */
export class ProfanityEngine {
  constructor(config = {}) {
    this.isTestMode = config.testMode ?? false;
    this.language = config.language ?? 'en';
    this.terms = null; 
    this.termsSet = null; 
    this.isInitialized = false;
  }

  /**
   * Only loads data when first needed
   * @private
   */
  async _ensureInitialized() {
    if (this.isInitialized) return;
    
    try {
      const filePath = await this._getLanguageFilePath();
      const fileContent = await this._readTermsFile(filePath);
      

      this.terms = fileContent
        .filter(term => term.trim())
        .map(term => term.trim().toLowerCase());
      

      this.termsSet = new Set(this.terms);
      this.isInitialized = true;
      
    } catch (error) {
      this._logWarning(`Failed to initialize: ${error.message}`);
      this.terms = [];
      this.termsSet = new Set();
      this.isInitialized = true;
    }
  }

  /**
   * Get the file path for the specified language
   * @private
   */
  async _getLanguageFilePath() {
    const currentFilePath = fileURLToPath(import.meta.url);
    const dataFolderPath = path.join(path.dirname(currentFilePath), 'data');
    const languageFilePath = path.join(dataFolderPath, `${this.language}.txt`);
    
    if (await this._fileExists(languageFilePath)) {
      return languageFilePath;
    }
    
    // Fallback to English
    this._logWarning(`Language file '${this.language}.txt' not found. Using 'en' as fallback.`);
    return path.join(dataFolderPath, 'en.txt');
  }

  /**
   * Check if file exists
   * @private
   */
  async _fileExists(filePath) {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read and parse terms file
   * @private
   */
  async _readTermsFile(filePath) {
    const fileContent = await readFile(filePath, 'utf8');
    return fileContent.split(/\r?\n/); // Handle both \n and \r\n
  }

  /**
   * Log warning if not in test mode
   * @private
   */
  _logWarning(message) {
    if (!this.isTestMode) {
      console.warn('Profanity Engine:', message);
    }
  }

  /**
   * Extract and normalize words from text
   * @private
   */
  _extractWords(text) {
    if (!text || typeof text !== 'string') return [];
    
    // Split on whitespace and punctuation, filter empty strings
    return text
      .toLowerCase()
      .split(/[\s\p{P}]+/u)
      .filter(word => word.length > 0);
  }

  /**
   * Check if a sentence contains any profanity words
   * @param {string} sentence - The text to check
   * @returns {Promise<boolean>} True if profanity is found
   */
  async hasCurseWords(sentence) {
    await this._ensureInitialized();
    
    if (!sentence || typeof sentence !== 'string') return false;
    
    const words = this._extractWords(sentence);
    return words.some(word => this.termsSet.has(word));
  }

  /**
   * Get all profanity words found in a sentence
   * @param {string} sentence - The text to analyze
   * @returns {Promise<string[]>} Array of found profanity words
   */
  async getCurseWords(sentence) {
    await this._ensureInitialized();
    
    if (!sentence || typeof sentence !== 'string') return [];
    
    const words = this._extractWords(sentence);
    const foundWords = new Set(); // Use Set to avoid duplicates
    
    for (const word of words) {
      if (this.termsSet.has(word)) {
        foundWords.add(word);
      }
    }
    
    return Array.from(foundWords);
  }

  /**
   * Get all profanity terms
   * @returns {Promise<string[]>} Array of all profanity terms
   */
  async all() {
    await this._ensureInitialized();
    return [...this.terms]; // Return a copy to prevent external modification
  }

  /**
   * Search for a specific term
   * @param {string} term - The term to search for
   * @returns {Promise<boolean>} True if the term is found
   */
  async search(term) {
    await this._ensureInitialized();
    
    if (!term || typeof term !== 'string') return false;
    
    return this.termsSet.has(term.trim().toLowerCase());
  }

  /**
   * Reset the engine (useful for testing or changing language)
   */
  reset() {
    this.terms = null;
    this.termsSet = null;
    this.isInitialized = false;
  }

 
}