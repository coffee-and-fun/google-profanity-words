import fs from 'fs';


export class ProfanityEngine {
    constructor(config) {
        let path;
        if (config && config.test) {
            path = 'data/list.txt'
        } else {
            path = './node_modules/@coffeeandfun/google-profanity-words/data/list.txt';
        }

        this.terms = fs.readFileSync(`${path}`, 'utf8').split('\n');
    }

    all() {
        return this.terms
    }

    search(term) {
        let result = this.terms.indexOf(term);
        return result > -1 ? true : false
    }
}
