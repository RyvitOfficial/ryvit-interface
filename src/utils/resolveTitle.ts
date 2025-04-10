const resolveTitle = (
  path: string,
  titleMap: Record<string, string>,
): string => {
  if (titleMap[path]) return titleMap[path];

  for (const pattern in titleMap) {
    if (pattern.endsWith('/*')) {
      const base = pattern.replace('/*', '');
      if (path.startsWith(base)) {
        return titleMap[pattern];
      }
    }
  }

  return '';
};

export default resolveTitle;
