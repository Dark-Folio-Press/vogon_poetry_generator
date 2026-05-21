const VOGON_SYSTEM_PROMPT =
  require('../prompts/systemPrompt');

async function generateBasePoem(openai, subject) {
  const response =
    await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: VOGON_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `Write a Vogon poem about: ${subject}`
        }
      ],
      temperature: 1.1,
      max_tokens: 180
    });

  return response.choices[0].message.content;
}

module.exports = generateBasePoem;