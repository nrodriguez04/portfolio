// LinkedIn-style inclusive month count, e.g. Jun 2025 – Oct 2026 = 1 yr 5 mos.
export function duration(start, end) {
  const months = (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
}
