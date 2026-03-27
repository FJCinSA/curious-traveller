// All city skyline SVGs used as card backgrounds and trip-page heroes.
// Gradient IDs are namespaced per city (e.g. skyGrad-sg, skyGrad-busan) to avoid
// conflicts when multiple skylines are rendered simultaneously on the home screen.
// Window opacity uses a deterministic formula instead of Math.random() so the output
// is stable across re-renders and React Strict Mode double-invocations.

const stars = [
  [50,30],[120,15],[200,45],[310,20],[420,35],[550,18],[650,40],[720,12],
  [800,28],[900,50],[1000,22],[1100,38],[1200,15],[1300,42],[1380,25],
  [180,70],[340,60],[480,75],[620,55],[760,68],[880,72],[1020,58],[1160,65],[1280,78],
]

// Deterministic window opacity — no Math.random() in render
function winOpacity(row, col) {
  return 0.08 + ((row * 4 + col * 7) % 10) * 0.028
}

// Shared lookup map: trip.theme string → skyline component.
// Imported by Home.jsx (card grid) and Hero.jsx (trip page header) so the
// mapping is defined once and never duplicated.
export const skylineMap = {
  singapore: SingaporeSkyline,
  busan:     BusanSkyline,
  jinhae:    JinhaeSkyline,
  gyeongju:  GyeongjuSkyline,
  seoul:     SeoulSkyline,
}

// ─── SINGAPORE ───────────────────────────────────────────────────────────────

function SingaporeSkyline() {
  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skyGrad-sg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020812" />
          <stop offset="40%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d2040" />
        </linearGradient>
        <linearGradient id="waterGrad-sg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d2040" />
          <stop offset="100%" stopColor="#060e1a" />
        </linearGradient>
        <linearGradient id="mbsGrad-sg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2d4a" />
          <stop offset="100%" stopColor="#0f1d30" />
        </linearGradient>
        <filter id="glow-sg">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1440" height="400" fill="url(#skyGrad-sg)" />

      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.7} fill="#ffffff" opacity={0.5 + (i % 4) * 0.12} />
      ))}

      <circle cx="1320" cy="60" r="22" fill="#c9a84c" opacity="0.12" />
      <circle cx="1320" cy="60" r="14" fill="#f0e080" opacity="0.18" />

      <rect x="0" y="340" width="1440" height="60" fill="url(#waterGrad-sg)" />

      <g opacity="0.3">
        <rect x="0" y="260" width="60" height="80" fill="#1a2d4a" />
        <rect x="55" y="240" width="40" height="100" fill="#1a2d4a" />
        <rect x="135" y="230" width="35" height="110" fill="#162236" />
        <rect x="1240" y="225" width="60" height="115" fill="#162236" />
        <rect x="1330" y="240" width="55" height="100" fill="#1a2d4a" />
        <rect x="1380" y="260" width="60" height="80" fill="#1a2d4a" />
      </g>

      {/* Marina Bay Sands */}
      <g transform="translate(600, 0)">
        <rect x="0" y="155" width="48" height="185" fill="url(#mbsGrad-sg)" />
        <rect x="3" y="158" width="6" height="180" fill="#1d3a5c" opacity="0.5" />
        <rect x="58" y="145" width="48" height="195" fill="url(#mbsGrad-sg)" />
        <rect x="61" y="148" width="6" height="190" fill="#1d3a5c" opacity="0.5" />
        <rect x="116" y="155" width="48" height="185" fill="url(#mbsGrad-sg)" />
        <rect x="119" y="158" width="6" height="180" fill="#1d3a5c" opacity="0.5" />
        <rect x="-8" y="145" width="180" height="12" rx="4" fill="#c9a84c" opacity="0.7" />
        <rect x="130" y="146" width="30" height="4" fill="#38bdf8" opacity="0.4" />
        {[0, 58, 116].flatMap(tx =>
          Array.from({ length: 12 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <rect key={`${tx}-${row}-${col}`} x={tx + 6 + col * 10} y={165 + row * 13} width="5" height="7"
                fill="#c9d8f0" opacity={winOpacity(row, col)} />
            ))
          )
        )}
      </g>

      {/* Supertrees */}
      <g transform="translate(200, 0)">
        {[0, 70, 130, 185].map((x, i) => {
          const h = [220, 180, 200, 170][i]
          const r = [55, 45, 52, 42][i]
          return (
            <g key={i}>
              <rect x={x + 16} y={h} width={8} height={340 - h} fill="#2d4a3e" />
              <ellipse cx={x + 20} cy={h} rx={r} ry={22} fill="#1a3d2e" />
              <ellipse cx={x + 20} cy={h} rx={r} ry={22} fill="none" stroke="#4ade80" strokeWidth="0.5" opacity="0.4" />
              {Array.from({ length: 8 }, (_, j) => {
                const angle = (j / 8) * Math.PI * 2
                return (
                  <circle key={j}
                    cx={x + 20 + Math.cos(angle) * r * 0.7}
                    cy={h + Math.sin(angle) * 14}
                    r="1.5" fill="#4ade80" opacity="0.7" filter="url(#glow-sg)" />
                )
              })}
            </g>
          )
        })}
      </g>

      {/* Merlion */}
      <g transform="translate(430, 270)" opacity="0.8">
        <rect x="0" y="50" width="30" height="20" rx="2" fill="#1a2d4a" />
        <ellipse cx="15" cy="45" rx="12" ry="18" fill="#1a2d4a" />
        <circle cx="15" cy="22" r="13" fill="#1a2d4a" />
        <path d="M15 15 Q8 5 5 -10 Q12 -2 15 10 Q18 -2 25 -10 Q22 5 15 15Z" fill="#38bdf8" opacity="0.4" />
      </g>

      {/* Esplanade */}
      <g transform="translate(460, 0)">
        <ellipse cx="20" cy="280" rx="30" ry="25" fill="#162236" stroke="#1d3a5c" strokeWidth="1" />
        <ellipse cx="60" cy="285" rx="25" ry="20" fill="#162236" stroke="#1d3a5c" strokeWidth="1" />
      </g>

      <line x1="0" y1="340" x2="1440" y2="340" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

// ─── BUSAN ───────────────────────────────────────────────────────────────────

function BusanSkyline() {
  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skyGrad-busan" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020a18" />
          <stop offset="50%" stopColor="#051830" />
          <stop offset="100%" stopColor="#08203e" />
        </linearGradient>
        <linearGradient id="oceanGrad-busan" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a2840" />
          <stop offset="100%" stopColor="#051020" />
        </linearGradient>
        <linearGradient id="mountainGrad-busan" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d1e30" />
          <stop offset="100%" stopColor="#071428" />
        </linearGradient>
        <filter id="glow-busan">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1440" height="400" fill="url(#skyGrad-busan)" />

      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.1 : 0.7} fill="#ffffff" opacity={0.4 + (i % 5) * 0.1} />
      ))}

      {/* Moon over ocean */}
      <circle cx="1100" cy="55" r="28" fill="#c9a84c" opacity="0.1" />
      <circle cx="1100" cy="55" r="20" fill="#ffe58a" opacity="0.15" />

      {/* Mountains — left (Geumjeongsan range) */}
      <polygon points="0,340 0,200 80,220 160,175 240,210 320,180 400,220 440,340"
        fill="url(#mountainGrad-busan)" opacity="0.9" />
      {/* Mountains — right */}
      <polygon points="1440,340 1440,195 1380,215 1300,170 1220,200 1140,180 1060,215 1000,240 960,340"
        fill="url(#mountainGrad-busan)" opacity="0.9" />

      {/* Haeundae high-rises — centre */}
      {[520, 560, 600, 640, 680, 720, 760, 800, 840].map((x, i) => {
        const h = [120, 90, 140, 100, 160, 110, 145, 95, 130][i]
        const w = 28
        return (
          <g key={i}>
            <rect x={x} y={h} width={w} height={340 - h} fill="#0d1e30" opacity="0.95" />
            {Array.from({ length: Math.floor((340 - h) / 18) }, (_, row) =>
              Array.from({ length: 3 }, (_, col) => (
                <rect key={`${i}-${row}-${col}`}
                  x={x + 4 + col * 8} y={h + 8 + row * 18}
                  width="5" height="9"
                  fill="#c9d8f0" opacity={winOpacity(i + row, col)} />
              ))
            )}
          </g>
        )
      })}

      {/* Gwangan Bridge */}
      <g transform="translate(0, 0)">
        {/* Main bridge deck */}
        <rect x="100" y="290" width="1240" height="8" rx="2" fill="#1a2d42" />
        {/* Cable-stay pylons */}
        {[420, 730, 1020].map((x, i) => (
          <g key={i}>
            <rect x={x - 3} y={240} width="6" height="58" fill="#243d58" />
            {/* Cables */}
            {[-60, -40, -20, 20, 40, 60].map((offset, j) => (
              <line key={j} x1={x} y1={243} x2={x + offset} y2={292}
                stroke="#1e3550" strokeWidth="1" opacity="0.6" />
            ))}
          </g>
        ))}
        {/* LED glow along bridge */}
        <rect x="100" y="294" width="1240" height="3" fill="#60a5fa" opacity="0.25" filter="url(#glow-busan)" />
      </g>

      {/* Ocean */}
      <rect x="0" y="298" width="1440" height="102" fill="url(#oceanGrad-busan)" />
      {/* Waves */}
      <path d="M0 310 Q180 305 360 312 Q540 320 720 310 Q900 300 1080 312 Q1260 320 1440 310 L1440 320 L0 320Z"
        fill="#0d2e4a" opacity="0.6" />
      <path d="M0 325 Q200 320 400 326 Q600 332 800 322 Q1000 312 1200 325 Q1320 330 1440 325 L1440 340 L0 340Z"
        fill="#081c30" opacity="0.7" />

      {/* Bridge reflection in water */}
      <rect x="100" y="300" width="1240" height="3" fill="#38bdf8" opacity="0.08" />

      <line x1="0" y1="298" x2="1440" y2="298" stroke="#38bdf8" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

// ─── JINHAE ──────────────────────────────────────────────────────────────────

function JinhaeSkyline() {
  // Deterministic petal positions
  const petals = [
    [120,180,14],[250,120,10],[380,200,16],[510,150,12],[640,180,14],
    [770,110,11],[900,190,13],[1030,140,15],[1160,170,12],[1290,130,14],
    [180,250,10],[330,280,13],[480,240,11],[620,260,14],[760,230,12],
    [900,270,10],[1050,250,13],[1200,240,11],[80,310,12],[420,300,10],
    [700,320,13],[1000,310,11],[1300,305,14],
  ]

  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skyGrad-jinhae" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#080414" />
          <stop offset="45%" stopColor="#140828" />
          <stop offset="80%" stopColor="#200c38" />
          <stop offset="100%" stopColor="#28102e" />
        </linearGradient>
        <linearGradient id="dawnGrad-jinhae" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#28102e" />
          <stop offset="50%" stopColor="#380c30" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1e0824" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="canalGrad-jinhae" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0c28" />
          <stop offset="100%" stopColor="#0c0618" />
        </linearGradient>
        <filter id="petal-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1440" height="400" fill="url(#skyGrad-jinhae)" />

      {/* Pre-dawn pink horizon glow */}
      <ellipse cx="720" cy="340" rx="600" ry="80" fill="#f9a8d4" opacity="0.06" />
      <ellipse cx="720" cy="360" rx="400" ry="50" fill="#fda4af" opacity="0.04" />

      {/* Stars — fewer, dimmer near dawn */}
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y}
          r={i % 3 === 0 ? 1 : 0.6}
          fill="#ffffff"
          opacity={(0.3 + (i % 4) * 0.1) * (1 - y / 500)} />
      ))}

      {/* Moon — crescent */}
      <circle cx="1280" cy="70" r="26" fill="#e8d0f0" opacity="0.12" />
      <circle cx="1290" cy="64" r="22" fill="#08041c" opacity="0.9" />

      {/* Cherry blossom branches — left side */}
      <g stroke="#2d1535" strokeWidth="6" fill="none" opacity="0.8">
        <path d="M0 100 Q80 120 160 90 Q220 70 280 110 Q320 130 380 95 Q420 75 460 100" />
        <path d="M80 120 Q90 160 95 200" />
        <path d="M160 90 Q170 130 175 180" />
        <path d="M280 110 Q285 155 290 200" />
      </g>
      {/* Branches — right side */}
      <g stroke="#2d1535" strokeWidth="6" fill="none" opacity="0.8">
        <path d="M1440 80 Q1360 105 1280 80 Q1220 60 1160 95 Q1100 120 1040 90 Q1000 70 960 100" />
        <path d="M1360 105 Q1355 150 1350 195" />
        <path d="M1280 80 Q1270 125 1265 175" />
        <path d="M1160 95 Q1155 140 1150 190" />
      </g>

      {/* Blossom clusters on branches */}
      {[
        [80, 120], [155, 88], [220, 72], [280, 108], [380, 93], [460, 98],
        [95, 200], [175, 178], [290, 198],
        [1360, 103], [1280, 78], [1220, 58], [1160, 93], [1040, 88], [960, 98],
        [1350, 193], [1265, 173], [1150, 188],
      ].map(([x, y], i) => (
        <g key={i}>
          {[[-8, -4], [8, -4], [0, -12], [-10, 4], [10, 4]].map(([dx, dy], j) => (
            <circle key={j} cx={x + dx} cy={y + dy} r="5"
              fill="#f9a8d4" opacity={0.6 + (j % 3) * 0.12} filter="url(#petal-glow)" />
          ))}
          <circle cx={x} cy={y} r="3" fill="#fce7f3" opacity="0.8" />
        </g>
      ))}

      {/* Falling petals */}
      {petals.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y}
          rx={r * 0.6} ry={r * 0.35}
          fill="#f9a8d4"
          opacity={0.3 + (i % 4) * 0.12}
          transform={`rotate(${(i * 37) % 60 - 30}, ${x}, ${y})`} />
      ))}

      {/* Canal — bottom third */}
      <rect x="0" y="340" width="1440" height="60" fill="url(#canalGrad-jinhae)" />

      {/* Canal banks */}
      <path d="M0 340 Q360 335 720 340 Q1080 345 1440 340 L1440 350 L0 350Z"
        fill="#1a0c28" opacity="0.7" />

      {/* Petal reflection in canal */}
      {petals.filter((_, i) => i % 3 === 0).map(([x, _, r], i) => (
        <ellipse key={i} cx={x} cy={360 + (i % 3) * 6}
          rx={r * 0.5} ry={r * 0.2}
          fill="#f9a8d4" opacity={0.12 + (i % 3) * 0.04} />
      ))}

      <line x1="0" y1="340" x2="1440" y2="340" stroke="#f9a8d4" strokeWidth="0.5" opacity="0.25" />
    </svg>
  )
}

// ─── GYEONGJU ────────────────────────────────────────────────────────────────

function GyeongjuSkyline() {
  // Extra stars — ancient observatory city
  const extraStars = [
    [65,55],[145,40],[225,68],[285,35],[375,52],[455,28],[535,62],[595,38],
    [675,58],[735,25],[815,44],[875,68],[945,32],[1005,55],[1065,22],
    [1125,48],[1185,38],[1245,62],[1305,28],[1365,52],[1415,38],
    [100,90],[220,100],[350,85],[490,95],[610,88],[750,102],[870,85],[990,98],[1110,90],[1240,82],[1360,96],
  ]

  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skyGrad-gyeongju" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#04040e" />
          <stop offset="40%" stopColor="#080c1e" />
          <stop offset="100%" stopColor="#0c1028" />
        </linearGradient>
        <linearGradient id="groundGrad-gyeongju" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c1020" />
          <stop offset="100%" stopColor="#060a14" />
        </linearGradient>
        <filter id="lantern-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="amber-glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1440" height="400" fill="url(#skyGrad-gyeongju)" />

      {/* Many stars — Gyeongju was an astronomy city */}
      {[...stars, ...extraStars].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y}
          r={i % 5 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.6}
          fill="#ffffff"
          opacity={0.4 + (i % 6) * 0.1} />
      ))}

      {/* Full moon */}
      <circle cx="300" cy="80" r="38" fill="#e8d8a0" opacity="0.08" />
      <circle cx="300" cy="80" r="28" fill="#f0e8b0" opacity="0.14" />

      {/* Tumuli mounds — gentle grass hills as silhouettes */}
      <ellipse cx="200" cy="340" rx="180" ry="70" fill="#080e18" />
      <ellipse cx="500" cy="350" rx="160" ry="60" fill="#070d16" />
      <ellipse cx="780" cy="345" rx="200" ry="75" fill="#080e18" />
      <ellipse cx="1080" cy="352" rx="150" ry="55" fill="#070d16" />
      <ellipse cx="1320" cy="345" rx="170" ry="65" fill="#080e18" />

      {/* Ground plane */}
      <rect x="0" y="370" width="1440" height="30" fill="url(#groundGrad-gyeongju)" />

      {/* Cheomseongdae observatory — cylindrical stone tower */}
      <g transform="translate(660, 0)">
        {/* Body */}
        <path d="M-12 340 Q-14 280 -10 240 Q0 220 10 240 Q14 280 12 340Z" fill="#141830" />
        {/* Stone courses (horizontal lines) */}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={-11 + i * 0.15} y1={248 + i * 7} x2={11 - i * 0.15} y2={248 + i * 7}
            stroke="#1e2840" strokeWidth="1" opacity="0.6" />
        ))}
        {/* Window opening (diamond) */}
        <path d="M0 300 L-5 310 L0 320 L5 310Z" fill="#fbbf24" opacity="0.3" filter="url(#amber-glow)" />
        {/* Platform top */}
        <rect x="-15" y="237" width="30" height="6" fill="#1a2240" />
        {/* Ambient glow */}
        <ellipse cx="0" cy="290" rx="20" ry="30" fill="#fbbf24" opacity="0.03" filter="url(#amber-glow)" />
      </g>

      {/* 5-story stone pagoda (Dabotap-style) — right of centre */}
      <g transform="translate(950, 0)">
        {/* Each story: wider at bottom, narrower at top */}
        {[
          [340, 50, 12], [325, 40, 10], [310, 32, 8], [295, 26, 7], [280, 20, 6]
        ].map(([y, w, h], i) => (
          <g key={i}>
            <rect x={-w} y={y} width={w * 2} height={h} fill="#10182e" />
            {/* Eave — decorative overhanging lip */}
            <rect x={-w - 4} y={y} width={w * 2 + 8} height={3} fill="#141e36" />
          </g>
        ))}
        {/* Spire */}
        <line x1="0" y1="260" x2="0" y2="238" stroke="#1a2440" strokeWidth="3" />
        <circle cx="0" cy="236" r="4" fill="#1a2440" />
      </g>

      {/* Stone lanterns — pair flanking pagoda */}
      {[880, 1025].map((x, i) => (
        <g key={i} transform={`translate(${x}, 0)`}>
          <rect x="-3" y="340" width="6" height="25" fill="#0e1628" />
          <rect x="-8" y="328" width="16" height="12" fill="#0e1628" />
          <rect x="-10" y="325" width="20" height="4" fill="#141e36" />
          {/* Lantern glow */}
          <rect x="-6" y="330" width="12" height="8" fill="#fbbf24" opacity="0.15" filter="url(#lantern-glow)" />
        </g>
      ))}

      {/* Sky amber tint near horizon (ancient amber glow) */}
      <rect x="0" y="330" width="1440" height="40" fill="#fbbf24" opacity="0.02" />

      <line x1="0" y1="370" x2="1440" y2="370" stroke="#fbbf24" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

// ─── SEOUL ───────────────────────────────────────────────────────────────────

function SeoulSkyline() {
  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="skyGrad-seoul" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#02060f" />
          <stop offset="40%" stopColor="#060f1e" />
          <stop offset="80%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#101e30" />
        </linearGradient>
        <linearGradient id="riverGrad-seoul" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#101e30" />
          <stop offset="100%" stopColor="#06101a" />
        </linearGradient>
        <linearGradient id="cityGlow-seoul" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.06" />
        </linearGradient>
        <filter id="city-glow-seoul">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1440" height="400" fill="url(#skyGrad-seoul)" />

      {/* City ambient glow at horizon */}
      <rect x="0" y="240" width="1440" height="120" fill="url(#cityGlow-seoul)" />

      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y}
          r={i % 3 === 0 ? 0.9 : 0.5}
          fill="#ffffff"
          opacity={0.25 + (i % 4) * 0.08} />
      ))}

      {/* Namsan Mountain — right side, behind N Seoul Tower */}
      <polygon
        points="900,360 950,280 980,250 1010,245 1040,255 1080,290 1120,360"
        fill="#080f1e" />

      {/* Background buildings — both sides */}
      <g opacity="0.6">
        {/* Left cluster */}
        {[[40,260,30,100],[75,240,25,120],[105,250,30,110],[140,235,20,125],
          [165,245,28,115],[198,255,22,105],[225,240,26,120]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0a1628" />
        ))}
        {/* Right cluster */}
        {[[1200,255,30,105],[1235,240,25,120],[1265,250,28,110],[1298,238,22,122],
          [1325,248,30,112],[1360,258,26,102],[1392,248,28,112]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0a1628" />
        ))}
      </g>

      {/* Main Seoul skyline — centre buildings */}
      {[
        [260,195,32,165], [298,178,28,182], [332,200,30,160], [368,165,26,195],
        [400,185,32,175], [438,210,24,150], [468,185,30,175], [502,160,28,200],
        [535,178,32,182], [573,195,26,165], [603,175,30,185],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#0c1a2e" />
          {/* Windows */}
          {Array.from({ length: Math.floor(h / 16) }, (_, row) =>
            Array.from({ length: Math.floor(w / 10), }, (_, col) => (
              <rect key={`${i}-${row}-${col}`}
                x={x + 3 + col * 9} y={y + 6 + row * 16}
                width="5" height="8"
                fill="#f59e0b" opacity={winOpacity(i + row, col + i) * 0.6} />
            ))
          )}
        </g>
      ))}

      {/* Lotte World Tower — tallest, centre-left */}
      <g transform="translate(700, 0)">
        <polygon points="-18,360 -16,300 -12,240 -8,180 -4,120 0,60 4,120 8,180 12,240 16,300 18,360"
          fill="#0e1c32" />
        {/* Glass facade lines */}
        {[80, 130, 180, 230, 280, 320].map((y, i) => (
          <line key={i} x1={-(18 - i * 2.5)} y1={y} x2={18 - i * 2.5} y2={y}
            stroke="#162238" strokeWidth="1" opacity="0.5" />
        ))}
        {/* Spire */}
        <line x1="0" y1="60" x2="0" y2="20" stroke="#162238" strokeWidth="3" />
        <circle cx="0" cy="20" r="4" fill="#f59e0b" opacity="0.4" filter="url(#city-glow-seoul)" />
      </g>

      {/* N Seoul Tower on Namsan — right */}
      <g transform="translate(990, 0)">
        {/* Tower base / shaft */}
        <rect x="-4" y="170" width="8" height="80" fill="#0e1c32" />
        {/* Observation disc */}
        <ellipse cx="0" cy="168" rx="18" ry="8" fill="#121e38" />
        <ellipse cx="0" cy="163" rx="14" ry="6" fill="#162240" />
        {/* Upper shaft */}
        <rect x="-2" y="130" width="4" height="35" fill="#0e1c32" />
        {/* Antenna */}
        <line x1="0" y1="130" x2="0" y2="100" stroke="#0e1c32" strokeWidth="2" />
        {/* Beacon glow */}
        <circle cx="0" cy="100" r="4" fill="#f59e0b" opacity="0.5" filter="url(#city-glow-seoul)" />
        {/* Tower windows */}
        {[-6, 0, 6].map((x, i) => (
          <rect key={i} x={x - 2} y={180} width="4" height="6" fill="#f59e0b" opacity={winOpacity(1, i) * 0.5} />
        ))}
      </g>

      {/* Han River */}
      <rect x="0" y="345" width="1440" height="55" fill="url(#riverGrad-seoul)" />

      {/* Mapo Bridge */}
      <g opacity="0.7">
        <rect x="200" y="350" width="800" height="5" fill="#101c30" />
        {[280, 600, 920].map((x, i) => (
          <rect key={i} x={x - 3} y={330} width="6" height="25" fill="#0e1a2e" />
        ))}
      </g>

      {/* City reflections in river */}
      <g opacity="0.08" transform="translate(0,700) scale(1,-1)">
        <rect x="700" y="360" width="18" height="315" fill="#f59e0b" />
        <rect x="990" y="250" width="8" height="210" fill="#f59e0b" />
      </g>

      {/* Water shimmer */}
      <path d="M0 355 Q240 352 480 356 Q720 360 960 354 Q1200 348 1440 355"
        fill="none" stroke="#1e3050" strokeWidth="1" opacity="0.5" />

      <line x1="0" y1="345" x2="1440" y2="345" stroke="#f59e0b" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}
