![alt text](.github/readme.png "Logo Title Text 1")


## About 
Full list of bad words and top swear words banned by Google. The list is updated monthly. Pull requests are welcome!


## Getting started
```
npm install -s @coffeeandfun/google-profanity-words
```


## Usage
```js
import { profanityEngine } from '@coffeeandfun/google-profanity-words';

let profanity = new profanityEngine();

await profanity.all(); // returns all bad words as an array.

await profanity.search('bad word'); // returns true if the word is found in the list.

```