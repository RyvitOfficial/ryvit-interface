export const getChangedDigits = (first: string, last: string) => {
  const changedDigits: number[] = [];
  const maxLength = Math.max(last.length, first.length);

  for (let i = 0; i < maxLength; i++) {
    if (last[i] !== first[i]) {
      changedDigits.push(i);
    }
  }

  return changedDigits;
};
