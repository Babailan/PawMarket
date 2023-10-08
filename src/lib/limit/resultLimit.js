export function resultLimit(array, page) {
  const startingIndex = page * 10;
  const lastIndex = startingIndex + 10;
  const sliced = array.slice(startingIndex, lastIndex);
  return sliced;
}
