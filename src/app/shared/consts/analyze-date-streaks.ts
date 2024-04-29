export const analyzeDateStreaks = (dates: string[]): { maxStreak: number; lastStreak: number } => {
  const DAY_IN_MILLISECONDS = 86400000; // One day in milliseconds
  if (dates.length === 0) {
    return { maxStreak: 0, lastStreak: 0 };
  }

  let maxStreak = 1;
  let currentStreak = 1;
  let lastStreak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to start of the day

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);

    if (next.getTime() - current.getTime() === DAY_IN_MILLISECONDS) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1;
    }
  }
  console.log(currentStreak);
  // Consider the final streak for maxStreak comparison
  maxStreak = Math.max(maxStreak, currentStreak);

  console.log(today);
  console.log(new Date(dates[dates.length - 1]));

  const lastArrayDate = new Date(dates[dates.length - 1]);
  lastArrayDate.setHours(0, 0, 0, 0);
  // Determine if the last streak includes today or is ongoing until today
  if (lastArrayDate.getTime() === today.getTime()) {
    lastStreak = currentStreak;
  } else {
    lastStreak = 0; // There is no current streak if the last date isn't today
  }

  return { maxStreak, lastStreak };
};
