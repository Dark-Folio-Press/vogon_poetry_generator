const generateBasePoem =
  require('../generators/generateBasePoem');

async function runTests(openai) {

  console.log(
    'Running prompt tests...'
  );

  const poem =
    await generateBasePoem(
      openai,
      'tax audits'
    );

  console.log(poem);
}

module.exports = runTests;