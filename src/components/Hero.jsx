import styles from './Hero.module.css'

export default function Hero({ trip }) {
  return (
    <header className={styles.hero}>
      <div className={styles.skyline} aria-hidden="true">
        <SkylineSVG />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>The Curious Traveller</p>
        <h1 className={styles.city}>{trip.city}</h1>
        <p className={styles.dates}>{trip.dates}</p>
        <p className={styles.tagline}>{trip.tagline}</p>
      </div>
      <div className={styles.scroll}>
        <span>↓</span>
      </div>
    </header>
  )
}

function SkylineSVG() {
  return (
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020812" />
          <stop offset="40%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#0d2040" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d2040" />
          <stop offset="100%" stopColor="#060e1a" />
        </linearGradient>
        <linearGradient id="mbsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2d4a" />
          <stop offset="100%" stopColor="#0f1d30" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1440" height="400" fill="url(#skyGrad)" />

      {/* Stars */}
      {[[50,30],[120,15],[200,45],[310,20],[420,35],[550,18],[650,40],[720,12],[800,28],[900,50],[1000,22],[1100,38],[1200,15],[1300,42],[1380,25],[180,70],[340,60],[480,75],[620,55],[760,68],[880,72],[1020,58],[1160,65],[1280,78]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.7} fill="#ffffff" opacity={0.6 + (i % 4) * 0.1} />
      ))}

      {/* Moon */}
      <circle cx="1320" cy="60" r="22" fill="#c9a84c" opacity="0.15" />
      <circle cx="1320" cy="60" r="18" fill="#e2c47a" opacity="0.08" />
      <circle cx="1320" cy="60" r="14" fill="#f0e080" opacity="0.2" />

      {/* Water reflection */}
      <rect x="0" y="340" width="1440" height="60" fill="url(#waterGrad)" />

      {/* Background buildings (hazy) */}
      <g opacity="0.3">
        <rect x="0" y="260" width="60" height="80" fill="#1a2d4a" />
        <rect x="55" y="240" width="40" height="100" fill="#1a2d4a" />
        <rect x="90" y="255" width="50" height="85" fill="#1a2d4a" />
        <rect x="135" y="230" width="35" height="110" fill="#162236" />
        <rect x="165" y="250" width="55" height="90" fill="#1a2d4a" />
        <rect x="1200" y="245" width="45" height="95" fill="#1a2d4a" />
        <rect x="1240" y="225" width="60" height="115" fill="#162236" />
        <rect x="1295" y="255" width="40" height="85" fill="#1a2d4a" />
        <rect x="1330" y="240" width="55" height="100" fill="#1a2d4a" />
        <rect x="1380" y="260" width="60" height="80" fill="#1a2d4a" />
      </g>

      {/* Marina Bay Sands — three towers + sky park */}
      <g transform="translate(600, 0)">
        {/* Tower 1 */}
        <rect x="0" y="155" width="48" height="185" fill="url(#mbsGrad)" />
        <rect x="3" y="158" width="6" height="180" fill="#1d3a5c" opacity="0.5" />
        {/* Tower 2 */}
        <rect x="58" y="145" width="48" height="195" fill="url(#mbsGrad)" />
        <rect x="61" y="148" width="6" height="190" fill="#1d3a5c" opacity="0.5" />
        {/* Tower 3 */}
        <rect x="116" y="155" width="48" height="185" fill="url(#mbsGrad)" />
        <rect x="119" y="158" width="6" height="180" fill="#1d3a5c" opacity="0.5" />
        {/* Sky Park */}
        <rect x="-8" y="145" width="180" height="12" rx="4" fill="#c9a84c" opacity="0.7" />
        <rect x="-8" y="145" width="180" height="12" rx="4" fill="none" stroke="#e2c47a" strokeWidth="1" opacity="0.5" />
        {/* Infinity pool glow */}
        <rect x="130" y="146" width="30" height="4" fill="#38bdf8" opacity="0.4" />
        {/* Windows */}
        {[0,58,116].map(tx => (
          Array.from({length: 12}, (_,row) =>
            Array.from({length: 4}, (_,col) => (
              <rect key={`${tx}-${row}-${col}`} x={tx+6+col*10} y={165+row*13} width="5" height="7"
                fill="#c9d8f0" opacity={0.15 + Math.random()*0.3} />
            ))
          )
        ))}
      </g>

      {/* Supertrees */}
      <g transform="translate(200, 0)">
        {[0, 70, 130, 185].map((x, i) => {
          const h = [220, 180, 200, 170][i]
          const r = [55, 45, 52, 42][i]
          const y = 340
          return (
            <g key={i}>
              {/* Trunk */}
              <rect x={x+16} y={h} width={8} height={y-h} fill="#2d4a3e" />
              {/* Canopy */}
              <ellipse cx={x+20} cy={h} rx={r} ry={22} fill="#1a3d2e" />
              <ellipse cx={x+20} cy={h} rx={r} ry={22} fill="none" stroke="#4ade80" strokeWidth="0.5" opacity="0.4" />
              {/* Glow dots on canopy */}
              {Array.from({length: 8}, (_, j) => {
                const angle = (j / 8) * Math.PI * 2
                const ex = x + 20 + Math.cos(angle) * r * 0.7
                const ey = h + Math.sin(angle) * 14
                return <circle key={j} cx={ex} cy={ey} r="1.5" fill="#4ade80" opacity="0.7" filter="url(#glow)" />
              })}
            </g>
          )
        })}
      </g>

      {/* Merlion (simplified) */}
      <g transform="translate(430, 270)" opacity="0.8">
        {/* Base */}
        <rect x="0" y="50" width="30" height="20" rx="2" fill="#1a2d4a" />
        {/* Body */}
        <ellipse cx="15" cy="45" rx="12" ry="18" fill="#1a2d4a" />
        {/* Head */}
        <circle cx="15" cy="22" r="13" fill="#1a2d4a" />
        {/* Water jet */}
        <path d="M15 15 Q8 5 5 -10 Q12 -2 15 10 Q18 -2 25 -10 Q22 5 15 15Z" fill="#38bdf8" opacity="0.4" />
      </g>

      {/* Esplanade Theatre (durian domes) */}
      <g transform="translate(460, 0)">
        <ellipse cx="20" cy="280" rx="30" ry="25" fill="#162236" stroke="#1d3a5c" strokeWidth="1" />
        <ellipse cx="60" cy="285" rx="25" ry="20" fill="#162236" stroke="#1d3a5c" strokeWidth="1" />
        {/* Spikes */}
        {Array.from({length: 12}, (_, i) => {
          const angle = (i / 12) * Math.PI
          return <line key={i} x1={20 + Math.cos(angle) * 28} y1={280 + Math.sin(angle) * 23}
            x2={20 + Math.cos(angle) * 34} y2={280 + Math.sin(angle) * 28}
            stroke="#1d3a5c" strokeWidth="1.5" opacity="0.7" />
        })}
      </g>

      {/* Reflection in water */}
      <g transform="translate(0,680) scale(1,-1)" opacity="0.12">
        <rect x="600" y="155" width="48" height="185" fill="#c9a84c" />
        <rect x="658" y="145" width="48" height="195" fill="#c9a84c" />
        <rect x="716" y="155" width="48" height="185" fill="#c9a84c" />
        <rect x="592" y="145" width="180" height="12" fill="#e2c47a" />
      </g>

      {/* Horizon line */}
      <line x1="0" y1="340" x2="1440" y2="340" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}
