// I'm setting initial fromDate and toDate today.getDate() - 1 because newsapi.org has limitations
// for free accounts (all articles have a 24 hours delay)
export function initializeFromDate(): string {
  const today = new Date();
  const daysAgo = new Date(today);
  daysAgo.setDate(today.getDate() - 3);
  return daysAgo.toISOString();
}

export function initializeToDate(): string {
  const today = new Date();
  const dayAgo = new Date(today);
  dayAgo.setDate(today.getDate() - 1);
  return dayAgo.toISOString();
}