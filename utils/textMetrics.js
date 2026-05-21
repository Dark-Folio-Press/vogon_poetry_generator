function countWords(text) {

  return text
    .trim()
    .split(/\s+/)
    .length;
}

function countLines(text) {

  return text
    .split('\n')
    .filter(line => line.trim())
    .length;
}

function adjectiveDensity(text) {

  const adjectiveHints = [
    'ous',
    'ent',
    'ive',
    'oid',
    'ulent'
  ];

  const words =
    text.toLowerCase().split(/\s+/);

  let count = 0;

  words.forEach(word => {

    if (
      adjectiveHints.some(
        ending => word.endsWith(ending)
      )
    ) {
      count++;
    }

  });

  return count / words.length;
}

module.exports = {
  countWords,
  countLines,
  adjectiveDensity
};