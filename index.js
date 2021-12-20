import fs from 'fs';


export class profanityEngine {
    constructor() {

        this.terms = fs.readFileSync('data/list.txt', 'utf8').split('\n');

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
