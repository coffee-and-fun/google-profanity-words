export interface ProfanityEngineOptions {
  /**
   * Language code matching a file in `data/` (e.g. `"en"`, `"es"`, `"fr"`, `"ga"`, `"ar"`, `"zh"`).
   * If the file does not exist, falls back to English.
   * @default "en"
   */
  language?: string;

  /**
   * When `true`, suppresses `console.warn` output (e.g. the language-fallback warning).
   * Useful inside test suites where warnings add noise.
   * @default false
   */
  testMode?: boolean;
}

export declare class ProfanityEngine {
  constructor(config?: ProfanityEngineOptions);

  /** Resolved language code passed to the constructor. */
  language: string;

  /** Whether warnings are suppressed. */
  isTestMode: boolean;

  /** Becomes `true` after the first async call loads the word list. */
  isInitialized: boolean;

  /** Full list of loaded terms (lowercase). Populated after first use. */
  terms: string[] | null;

  /** Set view of `terms` for O(1) lookups. Populated after first use. */
  termsSet: Set<string> | null;

  /** Returns `true` if `sentence` contains at least one profanity word. */
  hasCurseWords(sentence: string): Promise<boolean>;

  /** Returns an array of unique profanity words found in `sentence`. */
  getCurseWords(sentence: string): Promise<string[]>;

  /** Returns a copy of every loaded term for the current language. */
  all(): Promise<string[]>;

  /** Returns `true` if the exact term (case-insensitive, trimmed) is in the list. */
  search(term: string): Promise<boolean>;

  /** Clears loaded terms so the next call re-reads the data file. */
  reset(): void;
}
