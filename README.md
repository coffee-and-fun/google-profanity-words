![alt text](.github/readme.png 'Logo Title Text 1')

## Description

Full list of bad words and top swear words banned by Google. The list is updated monthly. Pull requests are welcome!

The `@coffeeandfun/google-profanity-words` is a Node.js module created by Robert James Gabriel from Coffee & Fun LLC. It is designed to help you identify and manage profanity words in a given text. The module provides functions to retrieve a list of all known profanity words, check if a specific word is considered profane, and handle empty strings appropriately.

## Installation

You can install the `@coffeeandfun/google-profanity-words` module using npm:

```bash
npm install @coffeeandfun/google-profanity-words
```

## Usage

To use the `@coffeeandfun/google-profanity-words`, first, import the module and create an instance:

```javascript
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

// Pass the 'language' parameter to specify the language (optional).
// Defaults to 'en' if no valid language code is provided.
const profanity = new ProfanityEngine({ language: 'es' });
```

The language parameter is optional and can be used to specify the language for the profanity list. It defaults to 'en' if no valid language code is provided. If the specified language file is not found, it will fall back to the 'en' language file and display a console warning.

## API Functions

### 1. `all()`

Retrieves all the profanity words as an array.

```javascript
const allWords = await profanity.all();
```

### 2. `search(word)`

Checks if a given word is considered profane.

```javascript
const searchWord = await profanity.search('shit');
// Returns true if the word is profane, otherwise false.
```

### 3. hasCurseWords(sentence)

Checks if a given sentence contains any profanity words.

```javascript
const sentence = 'Do not use bad words like mierda or idiota.';
const hasCurseWords = await profanity.hasCurseWords(sentence);
// Returns true if the sentence contains profanity words, otherwise false.
```

### 4. Handling Empty Strings

The `search` and `hasCurseWords` functions will return false for any empty string.

```javascript
const searchWord = await profanity.search('');
const hasCurseWords = await profanity.hasCurseWords('');
// Returns false for an empty string.
```

## Testing

The `@coffeeandfun/google-profanity-words` comes with a test suite using the Jest framework. To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions to this module are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to Robert James Gabriel and Coffee & Fun LLC for creating and maintaining this module, as well as the Jest team for the testing framework. Your efforts make this module more reliable and robust.

---
