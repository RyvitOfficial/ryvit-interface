function getHslFromString(s: string, sat = 65, light = 60) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h} ${sat}% ${light}%)`;
}

export default getHslFromString;
