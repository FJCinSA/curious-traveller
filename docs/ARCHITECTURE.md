# Architecture — The Curious Traveller

## How It Works

The app is built on a clean separation between engine and content.
The engine never needs to change.
The content is everything — and adding new content
is the work of minutes, not days.

## File Structure

src/data/ is where all trip content lives.
Each destination is a single JavaScript file — singapore.js,
busan.js, jinhae.js, gyeongju.js, seoul.js.
trips.js is the master registry that imports all of them
and exports a single array. The home screen reads this array
and builds the destination cards automatically.
itinerary.js holds the full day-by-day timeline,
dawn notes, daily whispers, and threshold moments.

src/components/ is the engine.
These files rarely need changing.
Home.jsx is the home screen with all destination cards.
TripPage.jsx is the template for every destination chapter.
Hero.jsx is the full-screen city header with skyline.
LocationCard.jsx is each individual place card.
Greeting.jsx is the morning greeting.
DawnNote.jsx is the daily dawn protocol note.
Skylines.jsx contains all five city SVG skylines.
MemoryJar.jsx is the memory collection and display.
SerendipityButton.jsx is the random local suggestion button.
ThresholdMoment.jsx is the between-city transition screen.
GettingAround.jsx is the collapsible transport panel.
ArrivalNote.jsx is the warm arrival message per destination.
InstallPrompt.jsx handles the PWA install banner.
UpdateManager.jsx handles silent auto-updates.

## How to Add a New Trip

Open Claude Code in the curious-traveller folder.
Paste this instruction and fill in the brackets:

Add a new trip chapter for [DESTINATION].
Dates: [DATES].
Hotel: [HOTEL NAME].
Key locations: [LIST YOUR PLACES].
Follow the exact same structure as src/data/singapore.js.
Same design — dark navy, gold accents, companion voice.
Add it to src/data/trips.js so it appears on the
home screen automatically.
Add dawn notes for each day to src/data/itinerary.js.
Add a threshold moment for the transition into this destination.
Add five serendipity suggestions.
Add slow travel notes for every location.

That is all. The engine does the rest.

## Deployment

After any change:
npm run build
netlify deploy --prod --dir=dist

The app on all devices updates automatically within minutes.
No manual refresh needed on any device.
