import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton.jsx'
import MovieList from '../../components/MovieList/MovieList.jsx'
import MovieSearch from '../../components/MovieSearch/MovieSearch.jsx'
import PremieresSection from '../../components/PremieresSection/PremieresSection.jsx'
import useDebounce from '../../hooks/useDebounce.js'
import useMovies from '../../hooks/useMovies.js'
import useScrollToHash from '../../hooks/useScrollToHash.js'

const SEARCH_DELAY_MS = 400

// Public page: the listings now come from the Django API (GET /movies/).
function HomePage({ favoriteIds, onToggleFavorite }) {
  const { status, movies, error, reload } = useMovies()
  // Typed in MovieSearch (inside Hero) and used by MovieList, a sibling of Hero.
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebounce(searchText, SEARCH_DELAY_MS)
  // Clearing is applied at once; typing waits for the debounce.
  const searchTerm = searchText === '' ? '' : debouncedSearch
  const hasMovies = status === 'ready' && movies.length > 0

  useScrollToHash(status !== 'loading')

  useEffect(() => {
    console.log(`[HomePage] filtering listings by: "${searchTerm}"`)
  }, [searchTerm])

  function toggleFavorite(movieId) {
    const movie = movies.find((item) => item.id === movieId)
    if (movie) onToggleFavorite(movie)
  }

  function showResults() {
    document.getElementById('now-showing')?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      {status === 'loading' && (
        <section className="catalog-status" aria-labelledby="catalog-loading-title">
          <p className="section-label" id="catalog-loading-title">Loading movie listings…</p>
          <LoadingSkeleton count={4} label="Loading movie listings" />
        </section>
      )}

      {status === 'error' && (
        <section className="catalog-status" aria-label="Movie listings">
          <ErrorMessage
            title="We couldn't load the movie listings"
            error={error}
            hint="Start the Django API (python manage.py runserver) and try again."
            onRetry={reload}
          />
        </section>
      )}

      {status === 'ready' && movies.length === 0 && (
        <section className="catalog-status empty-state" role="status">
          <p className="empty-state-icon" aria-hidden="true">🎬</p>
          <h2>No movies in the listings yet</h2>
          <p className="muted-text">Add the first one from the management page.</p>
          <Button to="/manage/new">Add a movie</Button>
        </section>
      )}

      {hasMovies && (
        <Hero movie={movies[0]}>
          <MovieSearch value={searchText} onChange={setSearchText} onSubmit={showResults} onClear={() => setSearchText('')} />
        </Hero>
      )}

      <PremieresSection />

      {hasMovies && (
        <MovieList
          movies={movies}
          searchTerm={searchTerm}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onClearSearch={() => setSearchText('')}
        />
      )}
    </>
  )
}

export default HomePage
