async function streamResponse(
  res,
  poem
) {

  const words = poem.split(' ');

  for (const word of words) {

    res.write(
      `data: ${JSON.stringify({
        text: word + ' '
      })}\n\n`
    );

    await new Promise(resolve =>
      setTimeout(resolve, 35)
    );
  }
}

module.exports = streamResponse;