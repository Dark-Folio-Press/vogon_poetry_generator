function weightedRandom(items) {

  const totalWeight =
    items.reduce(
      (sum, item) => sum + item.weight,
      0
    );

  let random =
    Math.random() * totalWeight;

  for (const item of items) {

    random -= item.weight;

    if (random <= 0) {
      return item.value;
    }
  }

  return items[0].value;
}

module.exports = weightedRandom;