import fs from 'fs';


export class ProfanityEngine {
    constructor(config) {
        let path;
        if (config && config.test) {
            path = 'data/list.txt'
        } else {
            path = './node_modules/@coffeeandfun/google-profanity-words/data/list.txt';
        }

        this.terms = fs.readFileSync(`${path}`, 'utf8').replace(/\r/g, "").split('\n');
    }

    all() {
        return this.terms
    }

    search(term) {
        let result = this.terms.indexOf(term);
        return result > -1 ? true : false
    }

    searchWithin(term) {
      for (let i = 0; i < this.terms.length; i++) {
        if (term.includes(this.terms[i])) {
          // while this determines that the profanity is within our term, it may result in false positives
          // hello - hell : true
          // So we will use Regex, to check if the profanity is
          // followed by -, _, *, a space, or a capital character like we see in camelCase,
          // or the end of the string.
          let re = `(${this.terms[i]})(\\s|\\-|\\_|\\*|[A-Z]|$)`;
          let reg = new RegExp(re, "g");
          if (reg.test(term)) {
            return true;
          }
        }
      }
      return false;
    }
}
