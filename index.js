import { readFile } from "fs";

export class ProfanityEngine {
  constructor(config) {
    let path;
    if (config && config.test) {
      path = "data/list.txt";
    } else {
      path =
        "./node_modules/@coffeeandfun/google-profanity-words/data/list.txt";
    }

    readFile(`${path}`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        this.terms = data.toString().split("\n");
      }
    });
  }

  all() {
    return this.terms;
  }

  search(term) {
    let result = this.terms.indexOf(term);
    return result > -1 ? true : false;
  }
}
