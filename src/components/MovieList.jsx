import MovieCard from './MovieCard.jsx'

function MovieList({ movies }) {
  return (
    <section className="movie-list" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
      <h2 id="now-showing-title">Now showing</h2>
      <p className="muted-text">Explore our movie listings. Showtimes use the 24-hour format.</p>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieList
