// Renders a single day section within a trip chapter.
// Shows the day header (short label, full date, theme name) and then maps
// every location in that day to a LocationCard.
//
// The `siblings` prop passed to each LocationCard is the list of other locations
// on the same day — used to populate the "What's nearby" panel inside the card.
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
        {day.locations.map(location => (
          <LocationCard
            key={location.id}
            location={location}
            // All other locations on this day — shown in the "What's nearby" panel
            siblings={day.locations.filter(l => l.id !== location.id)}
          />
        ))}
      </div>

    </section>
  )
}
