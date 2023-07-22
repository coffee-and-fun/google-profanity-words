import fs from 'fs';
import path from 'path';

export class ProfanityEngine {
    constructor(config) {
        const FILE_PATH = path.join('data', 'list.txt');
        this.terms = fs.readFileSync(FILE_PATH, 'utf8').split('\n');
    }

    all() {
        return this.terms;
    }

    search(term) {
        return this.terms.includes(term);
    }
}
