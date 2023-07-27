import { ProfanityEngine } from "../index.js";

const language = process.env.LANGUAGE || "en"; // Default to 'en' if the LANGUAGE environment variable is not set
let profanity;

describe("ProfanityEngine Functions tests", () => {
  beforeAll(async () => {
    profanity = new ProfanityEngine({
      language: "en",
      testMode: true,
    });
    await profanity.initialize(); // Initialize the profanity instance with the English language
  });

  it("Should get the correct language file path", async () => {
    const filePath = await profanity.getLanguageFilePath("es");
    expect(filePath).toContain("es.txt");
  });

  it("Should return the default language file path for unknown language", async () => {
    const filePath = await profanity.getLanguageFilePath("fr");
    expect(filePath).toContain("en.txt");
  });

  it("Should check if a file exists and return true", async () => {
    const filePath = await profanity.getLanguageFilePath("en");
    const fileExists = await profanity.fileExists(filePath);
    expect(fileExists).toEqual(true);
  });

  it("Should check if a file exists and return false", async () => {
    const filePath = "nonexistent.txt"; // Assume the file doesn't exist
    const fileExists = await profanity.fileExists(filePath);
    expect(fileExists).toEqual(false);
  });

  it("Should read and split the file content correctly", async () => {
    const filePath = await profanity.getLanguageFilePath("en");
    const terms = await profanity.readFileAndSplit(filePath);
    expect(terms.length).toBeGreaterThan(0);
  });

  it("Should handle read error and set terms to the english terms", async () => {
    const filePath = "nonexistent.txt"; // Assume the file doesn't exist
    await profanity.readFileAndSplit(filePath);
    let terms = await profanity.all();
    expect(terms.length).toEqual(959);
  });
});
