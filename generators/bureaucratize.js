function bureaucratize(poem) {
  return poem.replace(
    /\b(sad|love|lonely|heart)\b/gi,
    match => {
      const replacements = {
        sad: 'administratively distressed',
        love: 'emotional compliance protocol',
        lonely: 'socially under-documented',
        heart: 'central emotional processing unit'
      };

      return replacements[match.toLowerCase()] || match;
    }
  );
}

module.exports = bureaucratize;