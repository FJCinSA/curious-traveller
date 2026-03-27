import { SingaporeSkyline, BusanSkyline, JinhaeSkyline, GyeongjuSkyline, SeoulSkyline } from './Skylines'
import styles from './Hero.module.css'

const skylines = {
  singapore: SingaporeSkyline,
  busan: BusanSkyline,
  jinhae: JinhaeSkyline,
  gyeongju: GyeongjuSkyline,
  seoul: SeoulSkyline,
}

export default function Hero({ trip }) {
  const SkylineSVG = skylines[trip.theme] || SingaporeSkyline

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
        {trip.hotel && <p className={styles.hotel}>{trip.hotel}</p>}
        <p className={styles.tagline}>{trip.tagline}</p>
      </div>
      <div className={styles.scroll}>
        <span>↓</span>
      </div>
    </header>
  )
}
