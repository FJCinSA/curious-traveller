// Trip registry — auto-discovers all trip data files in this directory.
//
// DATA SHAPE: Every city file must export:
//   export const trip = {
//     id, city, country, dates, nights, hotel, tagline,
//     theme, flag, order, wide?, cardGradient, heroAccent
//   }
//   export const days = [{ id, date, label, theme, locations: [...] }]
//
// TO ADD A NEW DESTINATION:
//   1. Create src/data/newcity.js following the shape above.
//   2. Set `order` to control its position in the home screen grid.
//   3. Set `wide: true` if the card should span two columns.
//   That is all. Nothing else needs to change.

// Vite eagerly imports all .js files in this directory at build time
const modules = import.meta.glob('./*.js', { eager: true })

export const trips = Object.values(modules)
  // Filter to only modules that export both `trip` and `days`.
  // This automatically excludes itinerary.js (no `trip` export) and this file itself.
  .filter(m => m.trip && m.days)
  .map(m => ({ ...m.trip, days: m.days }))
  .sort((a, b) => a.order - b.order)
