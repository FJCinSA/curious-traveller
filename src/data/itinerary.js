// Day-by-day honeymoon itinerary for the morning greeting.
// Trip starts 30 March 2026 (Day 1 — departure from Johannesburg). Day number derived from calendar date.

export const TRIP_START = '2026-03-30'
export const TRIP_END   = '2026-04-16'

export const days = [
  {
    date: '2026-03-30',
    day: 1,
    location: 'Johannesburg → Singapore',
    dayLine: 'Day 1 of your honeymoon.',
    messageLine: 'SQ479 lifts off this afternoon at 13:45. Eleven hours over the Indian Ocean. When you land, it will be morning, and everything will look completely different.',
  },
  {
    date: '2026-03-31',
    day: 2,
    location: 'Singapore',
    dayLine: 'Day 2 of your honeymoon.',
    messageLine: 'Singapore at 06:10. Changi will welcome you gently. Yotelair is in Terminal 3 — bags down, shower, then Jewel, then the city. The honeymoon has arrived.',
  },
  {
    date: '2026-04-01',
    day: 3,
    location: 'Singapore',
    dayLine: 'Day 3 of your honeymoon.',
    messageLine: 'Full day in Singapore. Make it count. Tonight at 23:05 — SQ616 takes you to Korea. Leave the city by 21:00 and let Changi send you off properly.',
  },
  {
    date: '2026-04-02',
    day: 4,
    location: 'Busan',
    dayLine: 'Day 4 of your honeymoon.',
    messageLine: 'Busan at 06:35. The sea is right outside the Shilla Stay. Tonight — ask the hotel to book your taxi for 07:00 tomorrow morning. Tomorrow is the cherry blossom day.',
  },
  {
    date: '2026-04-03',
    day: 5,
    location: 'Jinhae',
    dayLine: 'Day 5 of your honeymoon. Today is the day.',
    messageLine: 'The cherry trees are waiting. Leave by 07:00 — ask the front desk to book your taxi now if you have not already.',
  },
  {
    date: '2026-04-04',
    day: 6,
    location: 'Busan',
    dayLine: 'Day 6 of your honeymoon.',
    messageLine: 'Back in Busan. Gamcheon this morning, Jagalchi at lunch, the bridge lit at night. The sea is still there.',
  },
  {
    date: '2026-04-05',
    day: 7,
    location: 'Busan',
    dayLine: 'Day 7 of your honeymoon.',
    messageLine: 'Last morning by the sea. Haedong Temple at dawn if you can manage it. Then take the day at whatever pace you need. Tomorrow the train takes you inland.',
  },
  {
    date: '2026-04-06',
    day: 8,
    location: 'Gyeongju',
    dayLine: 'Day 8 of your honeymoon.',
    messageLine: 'Checkout, then Bujeon Station — KTX to Singyeongju, 20 minutes, ₩8,400. Taxi to Sono Calm Bomun Resort. Tonight you sleep beside a lake that has been here for a thousand years.',
  },
  {
    date: '2026-04-07',
    day: 9,
    location: 'Gyeongju',
    dayLine: 'Day 9 of your honeymoon.',
    messageLine: 'Gyeongju. A kingdom that lasted 1,000 years — you have one full day. Bulguksa, the tombs, the observatory. It is more than enough.',
  },
  {
    date: '2026-04-08',
    day: 10,
    location: 'Seoul',
    dayLine: 'Day 10 of your honeymoon.',
    messageLine: 'Seoul today. SRT from Singyeongju to Suseo — 2 hours, ₩41,000. Seven nights at the Grand Walkerhill, above the Han River, above the whole city.',
  },
  {
    date: '2026-04-09',
    day: 11,
    location: 'Seoul',
    dayLine: 'Day 11 of your honeymoon.',
    messageLine: 'Seoul has eight million stories. A million cherry petals are falling on Yeouido today. Be there.',
  },
  {
    date: '2026-04-10',
    day: 12,
    location: 'Seoul',
    dayLine: 'Day 12 of your honeymoon.',
    messageLine: 'Secret gardens and ancient markets today. This city rewards the curious.',
  },
  {
    date: '2026-04-11',
    day: 13,
    location: 'Seoul',
    dayLine: 'Day 13 of your honeymoon.',
    messageLine: 'A slower day. Dragon Hill Spa is yours for as long as you want it. Seoul will still be here when you emerge.',
  },
  {
    date: '2026-04-12',
    day: 14,
    location: 'Seoul',
    dayLine: 'Day 14 of your honeymoon.',
    messageLine: 'Namsan Mountain today. The tower, the locks, and the whole city laid out below you.',
  },
  {
    date: '2026-04-13',
    day: 15,
    location: 'Seoul',
    dayLine: 'Day 15 of your honeymoon.',
    messageLine: 'Mapo at dinner and Hongdae until late. Tonight Seoul shows you its other side.',
  },
  {
    date: '2026-04-14',
    day: 16,
    location: 'Seoul',
    dayLine: 'Day 16 of your honeymoon.',
    messageLine: 'The last full day in Seoul. This city has given you everything. Let it give you one more thing.',
  },
  {
    date: '2026-04-15',
    day: 17,
    location: 'Seoul → Hong Kong',
    dayLine: 'Day 17 of your honeymoon.',
    messageLine: 'Check out of the Walkerhill and head for Incheon. CX419 departs at 20:05. Two hours to Hong Kong — find the gate, find the noodle bar, then CX749 takes you home.',
  },
  {
    date: '2026-04-16',
    day: 18,
    location: 'Johannesburg',
    dayLine: 'Day 18 of your honeymoon.',
    messageLine: 'CX749 lands in Johannesburg at 07:55. You left as two people and came back as something more. The companion remembers every day of it.',
  },
]

// Dawn notes — one sentence per day, shown before 11am on the home screen.
// Keyed by ISO date string.
export const dawnNotes = {
  '2026-03-31': 'You have just crossed eleven hours of sky. Yotelair is steps away. Sleep first. Singapore will still be extraordinary this afternoon.',
  '2026-04-01': 'Today is yours completely. The Supertrees light up at 7:45pm. Be underneath them when they do.',
  '2026-04-02': 'You land at dawn into a city built between mountains and sea. Check in. Sleep. Let Busan find you slowly.',
  '2026-04-03': 'Today is the day. 350,000 cherry trees and the two of you. Leave by seven. The canal will be yours before the crowds arrive.',
  '2026-04-04': 'Gamcheon Village was built by refugees who turned poverty into colour. Go in the morning when the alleys are quiet and the light falls sideways.',
  '2026-04-05': 'The fish market at Jagalchi opens before dawn. Go early. Order whatever the woman in the blue apron is selling. It will be extraordinary.',
  '2026-04-06': 'Gyeongju was the capital of the Silla Kingdom for a thousand years. Today you arrive. Start slowly. This city rewards patience.',
  '2026-04-07': 'Bulguksa Temple at dawn, before the tour buses. The stone lanterns have stood there for 1,300 years. Put your hand on one.',
  '2026-04-08': 'You leave the ancient capital today for the modern one. The KTX takes two hours. Watch Korea pass the window. It looks nothing like you expect.',
  '2026-04-09': 'Grand Walkerhill sits above the Han River. Look at it from your window before you go anywhere. That river is the heartbeat of this city.',
  '2026-04-10': 'Gyeongbokgung Palace. Arrive before the changing of the guard at ten. Wear the hanbok if you are willing. You will not regret it.',
  '2026-04-11': 'The cherry blossoms along Yeouido are at their best this week. Take Line 5 direct. Go in the morning before the wind takes the petals.',
  '2026-04-12': 'Changdeokgung Secret Garden only admits small groups and requires a reservation. If you have one — today is the day. If not — walk the palace walls instead.',
  '2026-04-13': 'Dragon Hill Spa is open all night. Go in the afternoon, stay for dinner, watch Seoul glow from the rooftop at dusk.',
  '2026-04-14': 'Namsan Tower at sunset. Take the cable car up. Find a padlock. Write your names. Lock it to the fence with ten million others.',
  '2026-04-15': 'Today is your last day in Korea. Go somewhere you have already been and loved. See it once more. Then let it go.',
}

// Daily whispers — one quiet line per day shown below the app title on the home screen.
// The companion speaking directly to Francois and James about the fact that they are here.
// Keyed by ISO date string.
export const dailyWhispers = {
  '2026-03-27': 'Something extraordinary is coming.',
  '2026-03-28': 'Something extraordinary is coming.',
  '2026-03-29': 'Something extraordinary is coming.',
  '2026-03-31': 'The world is large and you are in it.',
  '2026-04-01': 'A city built on water and will and wonder.',
  '2026-04-02': 'The sea has been waiting for you.',
  '2026-04-03': 'Today is the day the world turns pink.',
  '2026-04-04': 'A city reveals itself slowly to those who let it.',
  '2026-04-05': 'The best meals are eaten standing up in markets.',
  '2026-04-06': 'Some places hold their history lightly. This one holds it deep.',
  '2026-04-07': 'A thousand years of silence and you walked through it today.',
  '2026-04-08': 'Every journey between cities is a small life of its own.',
  '2026-04-09': 'Ten million people and somehow it feels intimate.',
  '2026-04-10': 'The old and the new here do not fight. They negotiate.',
  '2026-04-11': 'Cherry blossoms fall whether you watch them or not. Watch them.',
  '2026-04-12': 'You are exactly where you are supposed to be.',
  '2026-04-13': 'The city has given you everything. Give it one more day.',
  '2026-04-14': 'Notice everything. You are nearly at the last page.',
  '2026-04-15': 'This is not the end of anything.',
}

// Threshold moments — shown as full-screen overlays on the first app open of each transition day.
// Keyed by ISO date string.
export const thresholdMoments = {
  '2026-04-02': {
    title: 'Leaving Singapore',
    lines: [
      'One night and one magnificent day.',
      'The Supertrees. The heat. The hawker centres.',
      'Carry it with you.',
      '',
      'Busan is waiting —',
      'a city built between mountains and sea,',
      'rough and beautiful and completely itself.',
    ],
  },
  '2026-04-06': {
    title: 'Leaving Busan',
    lines: [
      'Four days. The sea. Jinhae.',
      'The cherry petals on the canal water.',
      'Carry it with you.',
      '',
      'Gyeongju is waiting —',
      'the oldest city in Korea,',
      'and for two days, yours.',
    ],
  },
  '2026-04-08': {
    title: 'Leaving Gyeongju',
    lines: [
      'Two days of silence and stone and',
      'a thousand years of history under your feet.',
      'Carry it with you.',
      '',
      'Seoul is waiting —',
      'ten million people,',
      'one extraordinary capital,',
      'your final chapter.',
    ],
  },
  '2026-04-15': {
    title: 'Leaving Seoul',
    lines: [
      'Eight nights above the Han River.',
      'The palace. The cherry blossoms.',
      'The BBQ smoke and the subway and',
      'the city that never stopped moving.',
      'Carry all of it.',
      '',
      'You are going home.',
      'But you will never be quite the same.',
    ],
  },
  '2026-04-16': {
    title: 'Almost home',
    lines: [
      'One last night sky.',
      'Hong Kong below you, Johannesburg ahead.',
      '',
      'Twenty-six years together',
      'and now this —',
      'a honeymoon that will never end',
      'because you will carry it',
      'every day for the rest of your lives.',
    ],
  },
}
