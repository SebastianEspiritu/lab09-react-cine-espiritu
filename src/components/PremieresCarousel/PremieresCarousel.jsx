import { useState } from 'react'
import Button from '../Button/Button.jsx'
import useWindowSize from '../../hooks/useWindowSize.js'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

function slidesPerView(width) {
  if (width < 640) return 1
  if (width < 1024) return 2
  return 3
}

function PremieresCarousel({ premieres }) {
  const { width } = useWindowSize()
  const perView = Math.min(slidesPerView(width), premieres.length)
  const lastStart = Math.max(premieres.length - perView, 0)
  const [requestedStart, setRequestedStart] = useState(0)
  // If the window grows, keep the start inside the valid range.
  const start = Math.min(requestedStart, lastStart)

  return (
    <div className="carousel" aria-roledescription="carousel" aria-label="Upcoming premieres">
      <div className="carousel-viewport">
        <ul
          className="carousel-track"
          style={{ '--per-view': perView, transform: `translateX(calc(-${start} * (100% + var(--carousel-gap)) / var(--per-view)))` }}
        >
          {premieres.map((premiere, index) => {
            const isVisible = index >= start && index < start + perView
            return (
              <li
                className="carousel-slide"
                key={premiere.id}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${premieres.length}`}
                aria-hidden={!isVisible}
              >
                <article className="premiere-card">
                  <img src={premiere.image} alt={`Poster for ${premiere.title}`} width="600" height="900" loading="lazy" />
                  <div className="premiere-card-content">
                    <p className="section-label">
                      {premiere.releaseDate ? `Opens ${dateFormatter.format(new Date(premiere.releaseDate))}` : 'Coming soon'}
                    </p>
                    <h3>{premiere.title}</h3>
                    <p className="muted-text">{premiere.synopsis}</p>
                    <p className="premiere-card-classification">{premiere.classification}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="carousel-controls">
        <Button variant="ghost" onClick={() => setRequestedStart(Math.max(start - 1, 0))} disabled={start === 0} aria-label="Previous premiere">
          ← Previous
        </Button>
        <p className="muted-text" aria-live="polite">
          {start + 1}–{start + perView} of {premieres.length} · {perView} per view
        </p>
        <Button variant="ghost" onClick={() => setRequestedStart(Math.min(start + 1, lastStart))} disabled={start === lastStart} aria-label="Next premiere">
          Next →
        </Button>
      </div>
    </div>
  )
}

export default PremieresCarousel
