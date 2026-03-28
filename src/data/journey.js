// Journey stop data for the live Journey Tracker.
// Used by JourneyMap (home screen horizontal route) and JourneyPage (full timeline).
import { TRIP_START, TRIP_END } from './itinerary'

export { TRIP_START, TRIP_END }

// The six stops of the honeymoon route.
// Jinhae is a day trip from Busan and does not appear as a separate stop.
// Distances from Potchefstroom, South Africa (nearest major departure point)
export const DISTANCES_FROM_HOME = {
  johannesburg: 0,
  singapore:    9200,
  busan:        9400,
  gyeongju:     9350,
  seoul:        9300,
  home:         0,
}

// City facts used in Family View on the Journey Tracker
export const CITY_FACTS = {
  johannesburg: 'A golden city at the start of an extraordinary journey.',
  singapore:    'One of the most extraordinary cities on Earth — a tropical island that became a nation through sheer will and vision.',
  busan:        "South Korea's second city, where mountains meet the sea and every meal is an adventure you won't forget.",
  gyeongju:     'The ancient capital of the Silla Kingdom — a city that has been beautiful for a thousand years.',
  seoul:        'Ten million people, one extraordinary capital, and some of the most extraordinary food, history, and beauty on the planet.',
  home:         'Back where it all began — carrying eighteen days of extraordinary beauty.',
}

export const JOURNEY_STOPS = [
  {
    id: 'johannesburg',
    city: 'Johannesburg',
    label: 'JHB',
    country: 'South Africa',
    flag: '🇿🇦',
    dates: '30 March 2026',
    dateRange: { start: '2026-03-30', end: '2026-03-30' },
    hotel: null,
    note: 'Departure day — SQ479 departs 13:45',
  },
  {
    id: 'singapore',
    city: 'Singapore',
    label: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    dates: '31 March – 1 April',
    dateRange: { start: '2026-03-31', end: '2026-04-01' },
    hotel: 'Yotelair Singapore, Changi Terminal 3',
    note: '1 night',
  },
  {
    id: 'busan',
    city: 'Busan',
    label: 'Busan',
    country: 'South Korea',
    flag: '🇰🇷',
    dates: '2 – 5 April',
    dateRange: { start: '2026-04-02', end: '2026-04-05' },
    hotel: 'Shilla Stay Haeundae',
    note: '4 nights',
  },
  {
    id: 'gyeongju',
    city: 'Gyeongju',
    label: 'Gyeongju',
    country: 'South Korea',
    flag: '🇰🇷',
    dates: '6 – 7 April',
    dateRange: { start: '2026-04-06', end: '2026-04-07' },
    hotel: 'Sono Calm Bomun Resort',
    note: '2 nights',
  },
  {
    id: 'seoul',
    city: 'Seoul',
    label: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷',
    dates: '8 – 15 April',
    dateRange: { start: '2026-04-08', end: '2026-04-15' },
    hotel: 'Grand Walkerhill Seoul',
    note: '7 nights',
  },
  {
    id: 'home',
    city: 'Johannesburg',
    label: 'Home',
    country: 'South Africa',
    flag: '🇿🇦',
    dates: '16 April 2026',
    dateRange: { start: '2026-04-16', end: '2026-04-16' },
    hotel: null,
    note: 'Return to Johannesburg',
  },
]

// 'past' | 'current' | 'future'
export function getStopStatus(stop, today) {
  if (today > stop.dateRange.end)   return 'past'
  if (today >= stop.dateRange.start) return 'current'
  return 'future'
}

// The stop they are in right now, or null if before/after trip
export function getCurrentStop(today) {
  if (today < TRIP_START || today > TRIP_END) return null
  return JOURNEY_STOPS.find(s => getStopStatus(s, today) === 'current') || null
}

// Day 1 = March 30
export function getHoneymoonDay(today) {
  if (today < TRIP_START || today > TRIP_END) return null
  return (
    Math.round(
      (new Date(today + 'T00:00:00Z') - new Date(TRIP_START + 'T00:00:00Z')) / 86_400_000
    ) + 1
  )
}

// Days elapsed since departure (1–18, capped)
export function getDaysTravelled(today) {
  if (today <= TRIP_START) return 1
  if (today > TRIP_END)   return 18
  return Math.min(
    Math.round(
      (new Date(today + 'T00:00:00Z') - new Date(TRIP_START + 'T00:00:00Z')) / 86_400_000
    ) + 1,
    18
  )
}

// Days remaining in the trip (0 once home)
export function getDaysRemaining(today) {
  if (today > TRIP_END) return 0
  if (today < TRIP_START) return 18
  return Math.max(
    0,
    Math.round(
      (new Date(TRIP_END + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 86_400_000
    )
  )
}
