const uglySounds =
  require('../lexicon/phonetic_ugliness.json');

const bureaucraticTerms =
  require('../lexicon/bureaucratic_terms.json');

const randomChoice =
  require('../utils/randomChoice');

function distortSyntax(poem, severity) {

  let lines = poem.split('\n');

  lines = lines.map(line => {

    // Random appendages
    if (Math.random() < severity / 10) {

      line += ` under ${
        randomChoice(bureaucraticTerms)
      }`;

    }

    // Random ugly phonetics
    if (Math.random() < severity / 8) {

      line += ` — ${
        randomChoice(uglySounds)
      }`;

    }

    // Run-on clause corruption
    if (Math.random() < severity / 18) {

      line +=
        ', notwithstanding the mucus-oriented procedural appendix';

    }

    return line;

  });

  return lines.join('\n');
}

module.exports = distortSyntax;