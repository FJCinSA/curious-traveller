// Shared date utilities used across multiple components.
// Centralised here so the format is defined once and never duplicated.

// Returns today's date as a YYYY-MM-DD string.
// Matches the ISO date format used throughout the app's data files.
export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
