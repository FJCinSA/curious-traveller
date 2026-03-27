import { trip as singaporeTrip, days as singaporeDays } from './singapore.js'
import { trip as busanTrip, days as busanDays } from './busan.js'
import { trip as jinhaeTrip, days as jinhaeDays } from './jinhae.js'
import { trip as gyeongjuTrip, days as gyeongjuDays } from './gyeongju.js'
import { trip as seoulTrip, days as seoulDays } from './seoul.js'

export const trips = [
  { ...singaporeTrip, days: singaporeDays },
  { ...busanTrip, days: busanDays },
  { ...jinhaeTrip, days: jinhaeDays },
  { ...gyeongjuTrip, days: gyeongjuDays },
  { ...seoulTrip, days: seoulDays },
]
