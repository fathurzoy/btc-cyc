export interface CycleRange {
  start: Date;
  end: Date;
  label: string;
}

export const generateTheoreticalWCL = (): CycleRange[] => {
  const ranges: CycleRange[] = [];

  // Anchor: October 11, 2025 (Center of user observed WCL Oct 1 - Oct 22 2025)
  const anchorDate = new Date('2025-10-11');
  const anchorTime = anchorDate.getTime();

  // Cycle Settings based on User Formula:
  // "28-30 bars TF 1 week" -> We use 28 weeks as the base interval.
  // 28 weeks = 196 days.
  const cycleIntervalDays = 196;

  // "3 bars TF 1 week" -> Width of the WCL column is 3 weeks.
  // 3 weeks = 21 days.
  // So radius is 10.5 days from center.
  const halfWidthDays = 10.5;

  const daysInMs = 86400000;

  // Generate Backward (Pre-2025)
  // We want cover 2018 - 2030.
  for (let i = 1; i <= 20; i++) { // Go back enough to cover 2018
    const centerTime = anchorTime - (i * cycleIntervalDays * daysInMs);
    const date = new Date(centerTime);

    // Filter to start from 2018
    if (date.getFullYear() < 2018) break;

    ranges.push({
      start: new Date(centerTime - (halfWidthDays * daysInMs)),
      end: new Date(centerTime + (halfWidthDays * daysInMs)),
      label: `Theoretical WCL (Pre-${i})`
    });
  }

  // Add Anchor itself (Oct 2025)
  ranges.push({
    start: new Date(anchorTime - (halfWidthDays * daysInMs)),
    end: new Date(anchorTime + (halfWidthDays * daysInMs)),
    label: `WCL Anchor (Oct 2025)`
  });

  // Generate Forward (Post-2025)
  for (let i = 1; i <= 15; i++) { // Go forward to cover 2030
    const centerTime = anchorTime + (i * cycleIntervalDays * daysInMs);
    const date = new Date(centerTime);

    // Filter to end at 2030
    if (date.getFullYear() > 2030) break;

    ranges.push({
      start: new Date(centerTime - (halfWidthDays * daysInMs)),
      end: new Date(centerTime + (halfWidthDays * daysInMs)),
      label: `Theoretical WCL #${i}`
    });
  }

  // Sort by date
  return ranges.sort((a, b) => a.start.getTime() - b.start.getTime());
};

export const generateTheoreticalDCL = (): CycleRange[] => {
  const ranges: CycleRange[] = [];

  // Anchor: January 20, 2026 12:00 PM (Adjusted +1 day to correct visual shift)
  // Mathematically center is Jan 19.5, but chart rendering shows -1 day (12-25).
  // Compensation: Move center to Jan 20.5 (Jan 20 12:00) to render 13-26.
  const anchorDate = new Date('2026-01-20T12:00:00');
  const anchorTime = anchorDate.getTime();

  // DCL Formula:
  // "59-60 bar TF 1D" -> Interval 60 days.
  const cycleIntervalDays = 60;

  // "±7 bar TF 1D" -> Adjusted to 6.5 days from midday to match exact dates 13-26.
  // 19.5 - 6.5 = 13.0
  // 19.5 + 6.5 = 26.0
  const halfWidthDays = 6.5;

  const daysInMs = 86400000;

  // Generate Backward (Pre-2026)
  for (let i = 1; i <= 60; i++) { // Go back enough to cover 2018
    const centerTime = anchorTime - (i * cycleIntervalDays * daysInMs);
    const date = new Date(centerTime);

    if (date.getFullYear() < 2018) break;

    ranges.push({
      start: new Date(centerTime - (halfWidthDays * daysInMs)),
      end: new Date(centerTime + (halfWidthDays * daysInMs)),
      label: `DCL (Pre-${i})`
    });
  }

  // Add Anchor
  ranges.push({
    start: new Date(anchorTime - (halfWidthDays * daysInMs)),
    end: new Date(anchorTime + (halfWidthDays * daysInMs)),
    label: `Anchor DCL (Jan 2026)`
  });

  // Generate Forward (Post-2026)
  for (let i = 1; i <= 30; i++) {
    const centerTime = anchorTime + (i * cycleIntervalDays * daysInMs);
    const date = new Date(centerTime);

    if (date.getFullYear() > 2030) break;

    ranges.push({
      start: new Date(centerTime - (halfWidthDays * daysInMs)),
      end: new Date(centerTime + (halfWidthDays * daysInMs)),
      label: `DCL #${i}`
    });
  }

  return ranges.sort((a, b) => a.start.getTime() - b.start.getTime());
};
