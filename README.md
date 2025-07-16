![alt text](.github/readme.png 'Logo Title Text 1')



# ☕ Google Profanity Words

> A fun and developer-friendly profanity detection library brought to you by [Coffee & Fun LLC](https://coffeeandfun.com) ☕🎉  
> Built and maintained with love by [Robert James Gabriel](https://github.com/robertgabriel) 💻✨

[![npm version](https://img.shields.io/npm/v/@coffeeandfun/google-profanity-words.svg)](https://www.npmjs.com/package/@coffeeandfun/google-profanity-words)  [![Stars](https://img.shields.io/github/stars/@coffeeandfun/google-profanity-words?style=social)](https://github.com/@coffeeandfun/google-profanity-words)


---

## 🚀 What’s This?

**Google Profanity Words** is a Node.js library that helps you detect and filter out naughty language (in multiple languages!) from your apps or content. Whether you’re building a chat app, a comment section, or a game—this one’s your profanity-slaying sidekick.

Made by devs for devs. Maintained by Robert at Coffee & Fun ☕❤️

---

## ✨ Features

- 🌐 **Multilingual support** – English and Spanish out of the box. More coming soon!
- 🔁 **Monthly updates** – Stay fresh with the latest no-no words
- 💡 **Easy to use API** – Straightforward methods, async/await friendly
- 🔬 **Tested with Jest** – Fully covered and ready for production
- ⚡ **Tiny & Fast** – Minimal deps = speedy installs and performance

---

## 📦 Install Me

```bash
npm install @coffeeandfun/google-profanity-words
```

---

## ⚡ Quickstart Guide

```javascript
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

// Default is English
const profanity = new ProfanityEngine();

// Español? You got it.
const profanityES = new ProfanityEngine({ language: 'es' });

// Check a single word
const isBad = await profanity.search('example');

// Or check a full sentence
const hasCurses = await profanity.hasCurseWords('This is a test sentence');

console.log(isBad, hasCurses); // true / false
```

---

## 🔍 API Docs (But Make It Chill)

### 🛠️ `new ProfanityEngine(options?)`

Create a new profanity detector engine!

```javascript
const profanity = new ProfanityEngine(); // Defaults to English
```

Or choose a specific language:

```javascript
const spanishProfanity = new ProfanityEngine({ language: 'es' });
```

#### Options:
- `language` (string, optional):  
  - `'en'` = English (default)  
  - `'es'` = Spanish  
  - If a language isn’t available, it falls back to English.

---

### 🔎 `search(word)`

Check a single word to see if it's naughty.

```javascript
const isProfane = await profanity.search('heck');
console.log(isProfane); // true or false
```

---

### 💬 `hasCurseWords(sentence)`

Check a full sentence or phrase for profanity.

```javascript
const result = await profanity.hasCurseWords('You silly goose');
console.log(result); // probably false, unless goose is banned now 🪿
```

---

### 📜 `all()`

Get the full list of bad words in the current language.

```javascript
const badWords = await profanity.all();
console.log(badWords); // ['word1', 'word2', 'etc']
```

---

### 💡 Real Talk: Edge Cases

- Empty strings? We gotchu. Returns `false`.
- `search()` and `hasCurseWords()` are **case-insensitive**.
- Special characters and punctuation? No problem.

---

## 🧪 Testing with Jest

We've got testing covered like whipped cream on a latte ☕🎂

Run the default test suite:

```bash
npm test
```

Or use more specific Jest commands:

```bash
# Watch mode (great for dev workflow)
npx jest --watch

# Run tests in a specific file
npx jest path/to/your/file.test.js

# Run coverage report
npx jest --coverage

# Run with verbose output (get all the juicy details)
npx jest --verbose
```

Tests are located in the `/__tests__/` directory and use the real profanity files, so you know it’s legit 👀✅

---

## 🔀 Example Use Cases

### ✅ Filter User Input

```js
async function filterInput(input) {
  if (await profanity.hasCurseWords(input)) {
    return '⚠️ Whoa there! Language, please.';
  }
  return input;
}
```

---

### 🌍 Multi-language Setup

```js
const en = new ProfanityEngine({ language: 'en' });
const es = new ProfanityEngine({ language: 'es' });

const englishResult = await en.search('bad');
const spanishResult = await es.search('malo');
```

---

## 🌍 Want to Contribute?

We love open source buddies 💛

### Add a New Language

1. Fork it 🍴
2. Add a file to `/data/` named like `fr.txt` for French
3. Fill it with one profane word per line
4. Push & open a pull request!

---

## 🙌 Who Made This?

Built by [Robert James Gabriel](https://github.com/robertgabriel) and the good people at **Coffee & Fun LLC**. We make dev tools with accessibility, coffee, and good vibes in mind.

> Wanna support? Send a coffee our way or just spread the word! ☕🚀

---

## 🧡 License

[MIT](https://opensource.org/licenses/MIT) – because sharing is caring.

---

## 💬 Support & Community

- 🐛 [Report Bugs](https://github.com/coffeeandfun/google-profanity-words/issues)
- 💡 [Join Discussions](https://github.com/coffeeandfun/google-profanity-words/discussions)
- 📬 Email: [support@coffeeandfun.com](mailto:hellow@coffeeandfun.com)

---

Made with ☕, code, and a sprinkle of magic at Coffee & Fun LLC 💖

## AI Usage
Calude AI was used to help with this read me & adding extra Jest tests. 