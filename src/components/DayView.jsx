import LocationCard from './LocationCard'
import styles from './DayView.module.css'

export default function DayView({ day }) {
  return (
    <section className={styles.day}>
      <div className={styles.dayHeader}>
        <div className={styles.dayLabel}>{day.label}</div>
        <div className={styles.dayInfo}>
          <h2 className={styles.dayDate}>{day.date}</h2>
          <p className={styles.dayTheme}>{day.theme}</p>
        </div>
        <div className={styles.dayLine} />
      </div>

      <div className={styles.locations}>
        {day.locations.map((location, index) => (
          <LocationCard key={location.id} location={location} index={index} />
        ))}
      </div>
    </section>
  )
}
