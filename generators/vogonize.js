const adjectives =
  require('../lexicon/adjectives.json');

const disgustingNouns =
  require('../lexicon/disgusting_nouns.json');

const alienCompounds =
  require('../lexicon/alien_compounds.json');

const randomChoice =
  require('../utils/randomChoice');

const committeeInterruptions =
  require('../prompts/committeeInterruptions');

function vogonize(poem, severity) {

  const injections = [
    randomChoice(adjectives),
    randomChoice(disgustingNouns),
    randomChoice(alienCompounds)
  ];

  let lines = poem.split('\n');

  lines = lines.map(line => {
    if (Math.random() > (1 - severity / 12)) {
      line += ` like a ${
        randomChoice(disgustingNouns)
      }`;
    }

    if (Math.random() > (1 - severity / 24)) {
      line += '\n\n' +
        randomChoice(
          committeeInterruptions
        );
    }

    return line;
  });

  lines.push(
    '',
    `Official notice: ${
      randomChoice(alienCompounds)
    } remains pending departmental review.`
  );

  return lines.join('\n');
}

module.exports = vogonize;