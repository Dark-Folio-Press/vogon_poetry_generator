function scorePoem(poem) {
  let score = 0;

  const uglyWords = [
    'mucus',
    'bureaucratic',
    'fungoid',
    'administrative',
    'putrescent',
    'compliance'
  ];

  uglyWords.forEach(word => {
    if (poem.toLowerCase().includes(word)) {
      score += 2;
    }
  });

  score += poem.split('\n').length;

  score = Math.min(score, 10);

let classification = '';

if (score <= 3) {
  classification =
    'Mildly Unpleasant';
}
else if (score <= 6) {
  classification =
    'Hazardous';
}
else if (score <= 8) {
  classification =
    'Cognitively Dangerous';
}
else {
  classification =
    'Prostetnic Tier';
}

return {
  score,
  classification
};
}

module.exports = scorePoem;