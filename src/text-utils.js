const wordSegmenter = new Intl.Segmenter(undefined, { granularity: 'word' });

export function normalizeTerm(term) {
  if (typeof term !== 'string') return '';
  return term.trim().toLowerCase();
}

export function extractWords(text) {
  if (typeof text !== 'string' || text.length === 0) return [];
  const words = [];
  for (const segment of wordSegmenter.segment(text.toLowerCase())) {
    if (segment.isWordLike) {
      words.push(segment.segment);
    }
  }
  return words;
}
