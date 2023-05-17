export function getFullDate(locale, date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
}

export function getShortDate(locale, date) {
  const options = { weekday: "short", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(locale, options);
}
