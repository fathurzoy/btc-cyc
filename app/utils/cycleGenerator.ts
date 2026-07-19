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
  const daysInMs = 86400000;

  // DCL formula from CycleTheory notes:
  // - 59-60 bars on 1D timeframe define the next DCL timing.
  // - The full DCL column spans ±7 daily bars from the expected low.
  // - The highest-confidence core spans ±3 daily bars from the expected low.
  // Calibrated examples:
  // - Jan 2026 DCL window ended on Jan 26 => center Jan 19, window Jan 12-26.
  // - Current update: Jul 28-Aug 11 => center Aug 4.
  const cycleIntervalDays = 59.5;
  const halfWidthDays = 7;
  const calibratedCenters = [
    { center: Date.UTC(2026, 0, 19), label: 'DCL Calibrated (Jan 2026)' },
    { center: Date.UTC(2026, 7, 4), label: 'DCL Calibrated (Jul-Aug 2026)' },
  ];
  const centerTimes = new Map<number, string>();

  calibratedCenters.forEach(({ center, label }) => centerTimes.set(center, label));

  const projectionAnchor = Date.UTC(2026, 7, 4);
  for (let i = -60; i <= 30; i++) {
    const centerTime = projectionAnchor + (i * cycleIntervalDays * daysInMs);
    const normalized = Date.UTC(
      new Date(centerTime).getUTCFullYear(),
      new Date(centerTime).getUTCMonth(),
      new Date(centerTime).getUTCDate()
    );
    const date = new Date(normalized);

    if (date.getUTCFullYear() < 2018 || date.getUTCFullYear() > 2030) continue;
    if (!centerTimes.has(normalized)) {
      centerTimes.set(normalized, i < 0 ? `DCL (Pre-${Math.abs(i)})` : `DCL #${i}`);
    }
  }

  centerTimes.forEach((label, centerTime) => {
    ranges.push({
      start: new Date(centerTime - (halfWidthDays * daysInMs)),
      end: new Date(centerTime + (halfWidthDays * daysInMs)),
      label,
    });
  });

  return ranges.sort((a, b) => a.start.getTime() - b.start.getTime());
};
