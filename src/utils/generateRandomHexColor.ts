export const generateRandomHexColor = (length: number) => {
  const letters = '0123456789ABCDEF';
  const colors = [];

  for (let j = 0; j < length; j++) {
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }

  return colors;
};
