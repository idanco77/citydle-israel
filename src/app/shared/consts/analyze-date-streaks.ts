export const analyzeDateStreaks = (dates: string[]): { maxStreak: number; lastStreak: number } => {
  if (!dates.length) {
    return { maxStreak: 0, lastStreak: 0 };
  }
  const DAY_IN_MILLISECONDS = 86400000; // One day in milliseconds
  let maxStreak = 1;
  let currentStreak = 1;
  let lastStreak = 1;
  let isCurrentStreakLast = true;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to start of the day

  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);

    if (next.getTime() - current.getTime() === DAY_IN_MILLISECONDS) {
      currentStreak++;
      if (isCurrentStreakLast) {
        lastStreak = currentStreak;
      }
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      if (current.getTime() >= today.getTime()) {
        isCurrentStreakLast = false;
      }
      currentStreak = 1;  // Reset streak count
    }
  }

  // Final check for the last streak if the last date in list is today or part of the current streak
  if (new Date(dates[dates.length - 1]).getTime() >= today.getTime()) {
    lastStreak = currentStreak;
  }
  maxStreak = Math.max(maxStreak, currentStreak);  // Consider the final streak

  return { maxStreak, lastStreak };
};
