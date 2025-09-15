const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const DateFormat = (date: string) => {
  const formatted = new Intl.DateTimeFormat('en-US', options).format(
    new Date(date),
  );

  return formatted;
};

export default DateFormat;
