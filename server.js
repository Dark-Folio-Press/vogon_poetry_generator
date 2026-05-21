require('dotenv').config();

const streamResponse = require('./utils/streamResponse');
const distortSyntax = require('./generators/distortSyntax');
const vogonize = require('./generators/vogonize');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai').default;
const path = require('path');

const generateBasePoem =
  require('./generators/generateBasePoem');

const bureaucratize =
  require('./generators/bureaucratize');

const scorePoem =
  require('./generators/scorePoem');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(
  path.join(__dirname, 'public')
));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/poem', async (req, res) => {
  const subject =
    (req.body.subject || 'the universe')
      .slice(0, 200);

    const severity =
    Math.min(
    10,
    Math.max(
      1,
      Number(req.body.severity || 5)
    )
  );
  res.setHeader(
    'Content-Type',
    'text/event-stream'
  );

  res.setHeader(
    'Cache-Control',
    'no-cache'
  );

  res.setHeader(
    'Connection',
    'keep-alive'
  );

  try {
    let poem =
      await generateBasePoem(
        openai,
        subject
      );

    poem = bureaucratize(poem);
    poem = vogonize(poem, severity);
    poem = distortSyntax(poem,severity);
    const vogonEvaluation =
    scorePoem(poem);

    await streamResponse(res,poem);

    res.write(
      `data: ${JSON.stringify({
        score: vogonEvaluation.score,
classification:
  vogonEvaluation.classification
      })}\n\n`
    );

    res.write('data: [DONE]\n\n');

    res.end();

  } catch (err) {

    console.error(
      'OpenAI error:',
      err.message
    );

    res.write(
      `data: ${JSON.stringify({
        error: err.message
      })}\n\n`
    );

    res.end();
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(
    `Vogon Poetry Generator running on http://localhost:${port}`
  );

  console.log(
    'Resistance is useless.'
  );
});