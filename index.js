import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class ProfanityEngine {
    constructor(config) {
        const language = config && config.language ? config.language : 'en';
        this.filePath = this.getLanguageFilePath(language);

        this.terms = fs.readFileSync(this.filePath, 'utf8').split('\n');
    }

    getLanguageFilePath(language) {
        const dataFolderPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
        const languageFilePath = path.join(dataFolderPath, `${language}.txt`);

        if (!fs.existsSync(languageFilePath)) {
            console.warn(`Warning: The ${language} language file could not be found. Defaulting to 'en' language.`);
            return path.join(dataFolderPath, 'en.txt');
        }

        return languageFilePath;
    }

    all() {
        return this.terms;
    }

    search(term) {
        const result = this.terms.indexOf(term);
        return result > -1;
    }
}
