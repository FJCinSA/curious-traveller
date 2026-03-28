# The Curious Traveller

*A wise and patient companion for the curious.*

Built in the days before departure. March 2026.

---

## What This Is

This is not a travel app.

Every travel app on the market is built for strangers —
generic, anonymous, indifferent to who is holding the phone.

This one was built for two specific people, on one specific
journey, at one specific moment in their lives. A honeymoon.
Twenty-six years together and finally this — Singapore,
cherry blossoms in Jinhae, the ancient stones of Gyeongju,
eight nights above the Han River in Seoul.

The companion knows their names. It knows what day of the
journey it is. It knows that 3 April is the most important
day — the cherry blossom day — and it marks the moment
with falling petals the instant the app opens. It knows when
they are tired after a long flight and tells them to sleep
first and let the city wait. It asks one quiet question at
the end of each day and keeps the answer forever.

It is a daily diary without writing a word.

---

## What It Does

It greets Francois and James by name every morning.
It tells them one perfect thing about the day ahead.
It whispers something true beneath the title each day
of the journey.
It knows where they are based on the date and lights
their current city in gold.
It holds their hand on every arrival — tired, disoriented,
full of travel — and tells them exactly what to do first.
It knows every bus, every train, every taxi route
across Singapore and South Korea.
It opens Naver Maps or Google Maps from any location card
with one tap. No app schemes. No black screens. Always works.
It captures a raw memory at the end of each day
and shapes it into something lasting using the Anthropic API.
On the final evening in Seoul it gathers every saved memory
and writes them both a letter — from the companion
who travelled every step with them.
When they cross from one city to the next it marks
the moment with a full-screen farewell and welcome.
It offers unexpected discoveries at the tap of a compass rose —
58 curated locations, never repeating, always surprising.
It shows the world in slow travel mode —
the whole app shifts to a warmer, amber tone.
Not what to do. What to notice.
It never crashes. It works offline.
It updates silently on every device.

---

## The Route

```
Johannesburg → Singapore → Busan → Jinhae (day trip) → Gyeongju → Seoul → Home
30 March – 16 April 2026  ·  18 days  ·  58 curated locations
```

| City | Dates | Hotel | Nights |
|------|-------|-------|--------|
| Singapore | 31 March – 1 April | Yotelair, Changi T3 | 1 |
| Busan | 2 – 5 April | Shilla Stay Haeundae | 4 |
| Gyeongju | 6 – 7 April | Sono Calm Bomun Resort | 2 |
| Seoul | 8 – 15 April | Grand Walkerhill Seoul | 7 |

---

## Features

**Daily companion**
Morning greeting with the day number and a whisper.
Date-aware — the app knows exactly where they are in the journey.

**58 curated locations**
Every restaurant, temple, market, and viewpoint confirmed by GPS.
Each card has a wow fact, practical notes, and one-tap navigation.

**Slow Travel Mode** `🐢 bottom left`
One tap shifts the whole app to a warmer amber tone.
The palette breathes differently. Felt before it is seen.
On first toggle: a tortoise walks across the screen. Never again.

**Serendipity** `compass bottom right`
Tap for an unexpected discovery. Never the same suggestion twice.
10 unique suggestions per city. Exhausted when all are found.

**Memory Jar**
One raw memory captured per day. Shaped by Claude into something
worth keeping. On the last evening: a letter written for them both.

**Navigation — zero black screens**
All links are plain `https://` URLs — no app deep-link schemes.
Korea: Naver Maps web · Singapore: Google Maps web
Taxi: Kakao Mobility web · KRide web

**Arrival Moments**
City name fades in large on first open in each new destination.
Once only. Never again.

**Threshold Moments**
Full-screen farewell and welcome when crossing between cities.

**Cherry Blossoms**
3 April only. 16 petals. Falling.

**Journey Tracker**
Live progress bar. Family view with city facts and a map.
Days elapsed, days remaining, current city lit in gold.

**PWA — works offline**
Installable on Android and iOS. Service worker caches everything.
Updates silently in the background.

---

## The Philosophy

*"We do this for the splendour of it all.
With a tad of history. To build memories.
The wow factor is why we are here."*
— Francois Coetzee, 26 March 2026

The companion never rushes. It never tells you how long
to stay. It never gives you a schedule. It speaks when asked
and steps back when you are living the moment —
because the moment is the only thing that matters.

---

## The App

Live at **[curious-traveller.netlify.app](https://curious-traveller.netlify.app)**

Open in any browser on any device.
Tap Install / Add to Home Screen when prompted.
Works fully offline after first load.

---

## For Future Trips

The engine is built. The content is all that changes.

To add a new destination, open Claude Code and say:
*"Add a new trip chapter for Japan.
Dates are such and such. Hotel is such and such.
Key places are this list.
Follow the same structure as singapore.js."*

The app does the rest.

Read `docs/ARCHITECTURE.md` for the full technical guide.
Read `docs/SOUL.md` before touching anything.

---

## Stack

```
React 18  ·  Vite 6  ·  vite-plugin-pwa  ·  CSS Modules
Netlify   ·  Anthropic API  ·  Claude Code  ·  care
```

No framework. No router library. No state management library.
Hash-based routing. Context for slow travel and memory state.
All localStorage access behind try/catch — never crashes.

---

*Built with care. March 2026.*
*For Francois and James.*
*On the occasion of their honeymoon.*
