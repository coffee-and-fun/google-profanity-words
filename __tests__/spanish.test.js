import { ProfanityEngine } from "../index.js";

const language = process.env.LANGUAGE || "en"; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe("Spanish Profanity tests", () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: "es",
      testMode: true,
    });
    await profanity.initialize(); // Initialize the profanity instance with the English language
  });
  it("Should get all the profanity words in an array", async () => {
    const allWords = await profanity.all();
    expect(allWords.length).toEqual(565);
  });

  it("Should return true for profanity words", async () => {
    const searchWord = await profanity.search("labios");
    expect(searchWord).toEqual(true);
  });

  it("Should return false for normal words", async () => {
    const searchWord = await profanity.search("ka");
    expect(searchWord).toEqual(false);
  });

  it("Should return false for any empty string", async () => {
    const searchWord = await profanity.search("");
    expect(searchWord).toEqual(true);
  });

  it("Should return true for a sentence containing a profanity word", async () => {
    const sentence = "No deberías decir malas culo palabras como mierda.";
    const hasCurseWords = await profanity.hasCurseWords(sentence);
    expect(hasCurseWords).toEqual(true);
  });

  it("Should return false for a sentence with no profanity word", async () => {
    const sentence = "Esta es una oración limpia y educada.";
    const hasCurseWords = await profanity.hasCurseWords(sentence);
    expect(hasCurseWords).toEqual(false);
  });
});
