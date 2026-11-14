import Button from '../Button/Button.jsx'
import MovieCard from '../MovieCard/MovieCard.jsx'
import useWindowSize from '../../hooks/useWindowSize.js'

function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

function matchesSearch(movie, searchTerm) {
  const query = normalize(searchTerm)
  if (!query) return true
  return [movie.title, movie.synopsis, movie.classification].some((field) => normalize(field).includes(query))
}

function cardsPerRow(width) {
  if (width < 640) return 1
  if (width < 900) return 2
  if (width < 1200) return 3
  return 4
}

function MovieList({ movies, searchTerm, favoriteIds, onToggleFavorite, onClearSearch }) {
  const { width } = useWindowSize()
  const columns = cardsPerRow(width)
  const visibleMovies = movies.filter((movie) => matchesSearch(movie, searchTerm))
  const isSearching = searchTerm.trim() !== ''

  return (
    <section className="movie-list" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
      <h2 id="now-showing-title">Now showing</h2>
      <p className="muted-text" aria-live="polite">
        {isSearching
          ? `${visibleMovies.length} of ${movies.length} movies match “${searchTerm.trim()}”.`
          : `Explore our movie listings. Showtimes use the 24-hour format. Showing ${columns} per row.`}
      </p>

      {visibleMovies.length > 0 ? (
        <div className="movie-grid" style={{ '--columns': columns }} data-columns={columns}>
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <p className="empty-state-icon" aria-hidden="true">🎬</p>
          <h3>No movies match “{searchTerm.trim()}”</h3>
          <p className="muted-text">Check the spelling or try another title, word or classification.</p>
          <Button variant="secondary" onClick={onClearSearch}>Clear search</Button>
        </div>
      )}
    </section>
  )
}

export default MovieList
