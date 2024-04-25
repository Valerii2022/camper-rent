export const reverseLocation = el => {
  const parts = el.split(', ');
  const reversed = parts.reverse();
  const newEl = reversed.join(', ');
  return newEl;
};
