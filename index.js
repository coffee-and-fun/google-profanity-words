import fs from 'fs';


export class profanityEngine {
    constructor(config) {
        let path;
        if (config && config.test) {
            path = 'data/list.txt'
        } else {
            path = './node_modules/@coffeeandfun/google-profanity-words/data/list.txt';
        }

        this.terms = fs.readFileSync(`${path}`, 'utf8').split('\n');
    }

    async all() {
        return new Promise(async (resolve, reject) => {
            resolve(this.terms); // this.terms;
        });
    }

    async search(term) {

        return new Promise(async (resolve, reject) => {
            let result = this.terms.indexOf(term);
            if (result > -1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });


    }

}
