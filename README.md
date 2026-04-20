![alt text](.github/readme.png 'Logo Title Text 1')

# ☕ Google Profanity Words

> A fun and developer-friendly profanity detection library brought to you by [Coffee & Fun LLC](https://coffeeandfun.com) ☕🎉
> Built and maintained with love by [Robert James Gabriel](https://github.com/robertgabriel) 💻✨

[![npm version](https://img.shields.io/npm/v/@coffeeandfun/google-profanity-words.svg)](https://www.npmjs.com/package/@coffeeandfun/google-profanity-words) [![Stars](https://img.shields.io/github/stars/coffee-and-fun/google-profanity-words?style=social)](https://github.com/coffee-and-fun/google-profanity-words)

---

## 🚀 What's This?

**Google Profanity Words** is a Node.js library that helps you detect and filter out naughty language (in multiple languages!) from your apps or content. Whether you're building a chat app, a comment section, a game, or a comment moderator — this one's your profanity-slaying sidekick.

Made by devs for devs. Maintained by Robert at Coffee & Fun ☕❤️

---

## ✨ Features

- 🌐 **Multilingual** — English, Spanish, French, Irish, Arabic, and Chinese out of the box
- ⚡ **Fast & tiny** — zero runtime dependencies, O(1) lookups with `Set`
- 🧪 **Battle-tested** — 200+ Jest tests across every language
- 🔒 **Secure by default** — no polynomial regex, ships with provenance
- 📝 **TypeScript ready** — types included, no `@types` install needed
- 🎯 **Framework-friendly** — works with Express, Fastify, Koa, Next.js, Discord.js, you name it

---

## 📦 Install Me

```bash
npm install @coffeeandfun/google-profanity-words
```

Requires **Node.js 16+**.

---

## ⚡ Quickstart Guide

```js
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

// Default is English
const profanity = new ProfanityEngine();

// Español? You got it.
const profanityES = new ProfanityEngine({ language: 'es' });

// Check a single word
const isBad = await profanity.search('hell');

// Or check a full sentence
const hasCurses = await profanity.hasCurseWords('This is a test sentence');

// Or grab the actual bad words
const found = await profanity.getCurseWords('oh hell and damn');

console.log(isBad, hasCurses, found);
// → true, false, ['hell', 'damn']
```

That's the whole idea. Everything below is detail. ✨

---

## 🧠 What a Returned Object Looks Like

Every check method is **async** and returns a Promise. Here's what you'll actually see back:

```js
await profanity.hasCurseWords('oh hell no');
// → true

await profanity.hasCurseWords('have a lovely day');
// → false

await profanity.getCurseWords('hell, damn, and hell again');
// → ['hell', 'damn']                 // unique, lowercase

await profanity.getCurseWords('a perfectly fine sentence');
// → []                               // empty array, never null

await profanity.search('HELL');
// → true                             // case-insensitive

await profanity.search('hello');
// → false

await profanity.all();
// → ['2 girls 1 cup', '2g1c', '4r5e', /* …962 total */]
```

---

## 🔍 API Reference

### 🛠️ `new ProfanityEngine(options?)`

Create a new profanity detector engine!

```js
const profanity = new ProfanityEngine(); // Defaults to English
const spanishProfanity = new ProfanityEngine({ language: 'es' });
```

#### Options

| Option     | Type      | Default | What it does                                                     |
| ---------- | --------- | ------- | ---------------------------------------------------------------- |
| `language` | `string`  | `'en'`  | ISO code matching a file in `data/`. Falls back to English.      |
| `testMode` | `boolean` | `false` | When `true`, suppresses `console.warn` output (great in tests).  |

---

### 🔎 `search(word)`

Check a single word to see if it's naughty.

```js
await profanity.search('heck');   // → false
await profanity.search('hell');   // → true
await profanity.search('HELL');   // → true (case-insensitive)
await profanity.search('  hell '); // → true (trimmed for you)
await profanity.search('');       // → false
await profanity.search(null);     // → false (handles bad input)
```

---

### 💬 `hasCurseWords(sentence)`

Check a full sentence or phrase for profanity.

```js
await profanity.hasCurseWords('You silly goose');        // → false
await profanity.hasCurseWords('oh hell no');             // → true
await profanity.hasCurseWords('(hell)!');                // → true (punctuation is handled)
await profanity.hasCurseWords('This is hellhole land');  // → false (whole-word match)
```

---

### 📋 `getCurseWords(sentence)`

Get the actual bad words that showed up (unique, lowercase).

```js
await profanity.getCurseWords('hell and damn and hell again');
// → ['hell', 'damn']

await profanity.getCurseWords('a clean message');
// → []
```

Great for logging moderation events or showing users exactly what tripped the filter.

---

### 📜 `all()`

Get the full list of bad words in the current language.

```js
const badWords = await profanity.all();
console.log(badWords.length); // → 962 (for English)
console.log(badWords[0]);     // → '2 girls 1 cup'
```

The returned array is a **copy** — mutating it won't affect the engine.

---

### 🔄 `reset()`

Clears the in-memory cache. Next call re-reads the data file. Useful in tests or if you hot-swap the data file.

```js
profanity.reset();
```

---

## 🌐 Supported Languages

| Code | Language              | Entries (approx.) |
| ---- | --------------------- | ----------------- |
| `en` | English 🇬🇧 (default) | 962               |
| `es` | Spanish 🇪🇸           | 564               |
| `fr` | French 🇫🇷            | 23                |
| `ga` | Irish 🇮🇪             | 15                |
| `ar` | Arabic                | 23                |
| `zh` | Chinese 🇨🇳           | 30                |

> If you pass a language code that doesn't exist, the engine gracefully falls back to English and prints a warning (unless `testMode: true`).

---

## 💡 Real Talk: Edge Cases

- Empty strings? We gotchu. Returns `false` / `[]`. 👌
- `null`, `undefined`, numbers, objects? No crashes — returns `false` / `[]`.
- **Case-insensitive** by default (`Hell`, `HELL`, `hell` all match).
- Handles punctuation: `hell!`, `(hell)`, `"hell"`, `hell.` — all detected.
- **Whole-word matching**: `hellhole` does **not** trigger on `hell`.
- Works with Unicode (Spanish `¿`/`¡`, Chinese characters, Arabic, etc.) thanks to `Intl.Segmenter`.

---

## 🧪 Testing with Jest

We've got testing covered like whipped cream on a latte ☕🎂

```bash
# Run the full suite
npm test

# Run a single language's tests
npm run en
npm run es
npm run engine

# Or use Jest directly
npx jest --watch
npx jest --coverage
npx jest path/to/file.test.js
```

Tests live in `__tests__/` and run against the **real** word-list files — no mocking, no surprises. 🎯

---

## 🔀 Example Use Cases

### ✅ Filter User Input

```js
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const profanity = new ProfanityEngine();

async function cleanInput(input) {
  if (await profanity.hasCurseWords(input)) {
    return '⚠️ Whoa there! Language, please.';
  }
  return input;
}
```

---

### 🌍 Multi-Language Setup

```js
const en = new ProfanityEngine({ language: 'en' });
const es = new ProfanityEngine({ language: 'es' });

const [englishHit, spanishHit] = await Promise.all([
  en.hasCurseWords('oh hell no'),
  es.hasCurseWords('¡qué mierda!'),
]);

console.log(englishHit, spanishHit); // → true, true
```

---

### 🚦 Express Middleware

Block profane comments at the API boundary.

```js
import express from 'express';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const app = express();
const profanity = new ProfanityEngine();

app.use(express.json());

app.post('/comments', async (req, res) => {
  const text = req.body?.text ?? '';
  if (await profanity.hasCurseWords(text)) {
    return res.status(400).json({
      error: 'Please keep it friendly 💛',
    });
  }
  res.json({ ok: true, comment: text });
});

app.listen(3000);
```

---

### ⚡ Fastify

```js
import Fastify from 'fastify';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const app = Fastify();
const profanity = new ProfanityEngine();

app.post('/chat', async (request, reply) => {
  const { message } = request.body;
  if (await profanity.hasCurseWords(message)) {
    reply.code(400);
    return { error: 'Please watch your language 😅' };
  }
  return { ok: true, message };
});

await app.listen({ port: 3000 });
```

---

### 🧭 Koa

```js
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const app = new Koa();
const profanity = new ProfanityEngine();

app.use(bodyParser());
app.use(async (ctx) => {
  const { text = '' } = ctx.request.body || {};
  if (await profanity.hasCurseWords(text)) {
    ctx.status = 400;
    ctx.body = { error: 'Language, please 🙈' };
    return;
  }
  ctx.body = { ok: true };
});

app.listen(3000);
```

---

### 🔺 Next.js API Route (App Router)

`app/api/moderate/route.js`:

```js
import { NextResponse } from 'next/server';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const profanity = new ProfanityEngine();

export async function POST(request) {
  const { text } = await request.json();
  const hasBadWords = await profanity.hasCurseWords(text);
  return NextResponse.json({ clean: !hasBadWords });
}
```

---

### 🎮 Discord.js Bot

Delete messages with profanity and warn the user.

```js
import { Client, GatewayIntentBits } from 'discord.js';
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const profanity = new ProfanityEngine();

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (await profanity.hasCurseWords(message.content)) {
    await message.delete();
    await message.channel.send(
      `${message.author}, please keep the channel friendly 💛`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

### 🎭 Replace / Censor Matched Words

Swap found words with asterisks.

```js
async function censor(text) {
  const bad = await profanity.getCurseWords(text);
  let result = text;
  for (const word of bad) {
    const mask = '*'.repeat(word.length);
    result = result.replaceAll(new RegExp(`\\b${word}\\b`, 'gi'), mask);
  }
  return result;
}

await censor('what the hell, damn it');
// → 'what the ****, **** it'
```

---

### 📊 Count Profanity

```js
async function countBad(text) {
  const words = await profanity.getCurseWords(text);
  return {
    count: words.length,
    words,
    hasProfanity: words.length > 0,
  };
}

await countBad('hell and damn and hell again');
// → { count: 2, words: ['hell', 'damn'], hasProfanity: true }
```

---

### 📦 Batch Processing

Check a whole array of strings in parallel.

```js
const messages = [
  'hello world',
  'oh hell no',
  'have a great day',
  'damn it',
];

const results = await Promise.all(
  messages.map(async (msg) => ({
    message: msg,
    clean: !(await profanity.hasCurseWords(msg)),
  }))
);

console.log(results);
// [
//   { message: 'hello world',       clean: true  },
//   { message: 'oh hell no',        clean: false },
//   { message: 'have a great day',  clean: true  },
//   { message: 'damn it',           clean: false },
// ]
```

---

### 🧩 TypeScript

Types ship with the package — just import.

```ts
import {
  ProfanityEngine,
  ProfanityEngineOptions,
} from '@coffeeandfun/google-profanity-words';

const options: ProfanityEngineOptions = { language: 'en', testMode: true };
const profanity = new ProfanityEngine(options);

const hit: boolean = await profanity.hasCurseWords('oh hell no');
const words: string[] = await profanity.getCurseWords('oh hell no');
```

---

## 🌍 Want to Contribute?

We love open source buddies 💛

### Add a New Language

1. Fork it 🍴
2. Add a file to `/data/` named like `de.txt` for German (ISO 639-1 code)
3. Fill it with one profane word per line, **lowercase**
4. Add a test file under `__tests__/` following `spanish.test.js` as a template
5. Push & open a pull request! 🚀

---

## 🙌 Who Made This?

Built by [Robert James Gabriel](https://github.com/robertgabriel) and the good people at **Coffee & Fun LLC**. We make dev tools with accessibility, coffee, and good vibes in mind.

> Wanna support? Send a coffee our way or just spread the word! ☕🚀

---

## 🔐 Security

Found a vulnerability? Please report it privately — see [SECURITY.md](SECURITY.md). 🙏

---

## 🧡 License

[MIT](LICENSE) – because sharing is caring.

---

## 💬 Support & Community

- 🐛 [Report Bugs](https://github.com/coffee-and-fun/google-profanity-words/issues)
- 💡 [Join Discussions](https://github.com/coffee-and-fun/google-profanity-words/discussions)
- 📬 Email: [hello@coffeeandfun.com](mailto:hello@coffeeandfun.com)

---

Made with ☕, code, and a sprinkle of magic at Coffee & Fun LLC 💖

## 🤖 AI Usage

Claude AI was used to help with this README and with adding extra Jest tests.
