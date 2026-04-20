import { readFile, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const defaultDataFolder = path.join(packageRoot, 'data');

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function resolveLanguageFilePath(language, dataFolder = defaultDataFolder) {
  const requestedPath = path.join(dataFolder, `${language}.txt`);
  if (await fileExists(requestedPath)) {
    return { filePath: requestedPath, fellBack: false };
  }
  return {
    filePath: path.join(dataFolder, 'en.txt'),
    fellBack: true,
  };
}

export async function loadTerms(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return parseTerms(raw);
}

export function parseTerms(raw) {
  const lines = raw.split(/\r?\n/);
  const terms = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      terms.push(trimmed.toLowerCase());
    }
  }
  return terms;
}
