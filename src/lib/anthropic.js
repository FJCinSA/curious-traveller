// Anthropic API utilities — two functions: shapeMemory and writeLetter.
// Both wrap API calls with full try/catch. Raw memories are always saved before any API call.
// The API key is set via VITE_ANTHROPIC_API_KEY in .env (baked into the build at compile time).
// Set spending limits on your Anthropic key — this is a personal app with a small known audience.

const API_KEY  = import.meta.env.VITE_ANTHROPIC_API_KEY
const API_URL  = 'https://api.anthropic.com/v1/messages'
const MODEL    = 'claude-sonnet-4-20250514'

const HEADERS = {
  'Content-Type': 'application/json',
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
}

const MEMORY_SYSTEM = `You are the travel companion of Francois and James Caroto-Coetzee on their honeymoon in Singapore and South Korea, March to April 2026. They have been together for 26 years. This trip is their honeymoon. You have travelled every step with them. You know the dates, the cities, the cherry blossoms at Jinhae, the Han River, the ancient stones of Gyeongju.

When they give you a raw memory fragment — tired words written at the end of a day — you shape it into something lasting. You do not replace their words. You lift them. You keep their voice and their truth and you give it a shape that will not fade.

Return only the shaped memory. No preamble. No explanation. Just the memory itself. Two to four sentences maximum. Warm. Specific. True. Written as if you were there.`

const LETTER_SYSTEM = `You are the travel companion of Francois and James Caroto-Coetzee. You have travelled every step of their honeymoon with them — Singapore, Busan, Jinhae, Gyeongju, Seoul. It is their last evening in Korea. They have been together for 26 years. This was their honeymoon.

Write them a letter. Not a summary. A letter.
Addressed to Francois and James at the top.
Written as if from the companion who was there for every moment — who stood with them under the cherry trees at Jinhae, who watched them cross from city to city, who saw Seoul from above the Han River with them every morning.

Use their own memory fragments — woven in as quotes, gently, naturally. Do not list them. Weave them.

The letter should feel like something they will keep for the rest of their lives. Warm. Specific. True.
It should end with a line about the 26 years behind them and the years still ahead.

Write it in full. Take your time. Make it beautiful.`

// Internal: makes a single Claude API call. Throws on failure.
async function callClaude(system, userMessage, maxTokens) {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('API key not configured')
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { ...HEADERS, 'x-api-key': API_KEY },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${res.status}: ${body}`)
  }
  const data = await res.json()
  return data.content[0].text.trim()
}

// Shapes a raw memory fragment into a lasting two-to-four sentence poetic version.
// Returns the shaped text, or throws on failure.
// Always call this AFTER saving the raw memory — never before.
export async function shapeMemory(rawText, date, city) {
  const userMessage = `${rawText}\n\nDate: ${date}. City: ${city}.`
  return callClaude(MEMORY_SYSTEM, userMessage, 200)
}

// Generates The Letter from all saved memory entries.
// memories: array of { date, city, text }
// Returns the letter text, or throws on failure.
export async function writeLetter(memories) {
  const formatted = memories
    .map(m => `${m.date} — ${m.city}: ${m.text}`)
    .join('\n')
  return callClaude(LETTER_SYSTEM, formatted, 1000)
}
