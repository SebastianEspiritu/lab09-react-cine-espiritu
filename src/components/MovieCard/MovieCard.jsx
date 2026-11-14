import { useId } from 'react'
import Button from '../Button/Button.jsx'

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const titleId = useId()
  const showtimesId = useId()
  const { id, image, title, classification, rating, showtimes } = movie

  return (
    <article className={`movie-card${isFavorite ? ' movie-card--favorite' : ''}`} aria-labelledby={titleId}>
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
            <dd>{rating === null ? 'Not rated yet' : <><span aria-hidden="true">★ </span>{rating.toFixed(1)} out of 10</>}</dd>
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
        <Button
          className="movie-card-favorite"
          variant={isFavorite ? 'primary' : 'ghost'}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          onClick={() => onToggleFavorite(id)}
        >
          <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
          {isFavorite ? 'Favorite' : 'Add to favorites'}
        </Button>
      </div>
    </article>
  )
}

export default MovieCard
