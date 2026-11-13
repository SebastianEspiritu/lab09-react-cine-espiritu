import { useId } from 'react'

function MovieCard({ movie }) {
  const titleId = useId()
  const showtimesId = useId()
  const { id, image, title, classification, rating, showtimes } = movie

  return (
    <article className="movie-card" aria-labelledby={titleId}>
      <img
        className="movie-card-poster"
        src={image}
        alt={`Poster for ${title}`}
        width="600"
        height="900"
        loading="lazy"
        decoding="async"
      />
      <div className="movie-card-content">
        <h3 id={titleId}>{title}</h3>
        <dl className="movie-card-details">
          <div>
            <dt>Classification</dt>
            <dd>{classification}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd><span aria-hidden="true">★ </span>{rating.toFixed(1)} out of 10</dd>
          </div>
        </dl>
        <h4 id={showtimesId}>Available showtimes</h4>
        <ul className="movie-card-showtimes" aria-labelledby={showtimesId}>
          {showtimes.map((showtime) => (
            <li key={`${id}-${showtime}`}>
              <time dateTime={showtime}>{showtime}</time>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default MovieCard
