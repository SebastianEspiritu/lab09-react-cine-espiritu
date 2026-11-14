import { useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import MovieSearch from './components/MovieSearch/MovieSearch.jsx'
import PremieresSection from './components/PremieresSection/PremieresSection.jsx'
import Toast from './components/Toast/Toast.jsx'
import rawMovies from './data/movies.js'
import adaptMovie from './lib/adaptMovie.js'
import useDebounce from './hooks/useDebounce.js'
import useToast from './hooks/useToast.js'

// Every listing goes through the adapter once, before any component sees it.
const movies = rawMovies.map(adaptMovie)
const FAVORITES_STORAGE_KEY = 'cinema-espiritu:favorites'
const SEARCH_DELAY_MS = 400

function readStoredFavorites() {
  try {
    const storedValue = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY))
    return Array.isArray(storedValue) ? storedValue.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function App() {
  const featuredMovie = movies[0]

  // Header (the counter) and MovieList (the cards) are siblings, so the
  // favorites live in their closest common ancestor: App.
  const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites)
  // Typed in MovieSearch (inside Hero) and used by MovieList, a sibling of Hero.
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebounce(searchText, SEARCH_DELAY_MS)
  // Clearing is applied at once; typing waits for the debounce.
  const searchTerm = searchText === '' ? '' : debouncedSearch
  const { toast, showToast, hideToast } = useToast(3000)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Storage may be unavailable (private mode or full); favorites still work in memory.
    }
  }, [favoriteIds])

  useEffect(() => {
    console.log(`[App] filtering listings by: "${searchTerm}"`)
  }, [searchTerm])

  function toggleFavorite(movieId) {
    const movie = movies.find((item) => item.id === movieId)
    const wasFavorite = favoriteIds.includes(movieId)

    setFavoriteIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
    )
    showToast(
      wasFavorite ? `☆ “${movie.title}” removed from favorites` : `★ “${movie.title}” added to favorites`,
      wasFavorite ? 'info' : 'success',
    )
  }

  function showResults() {
    window.location.hash = 'now-showing'
  }

  function clearSearch() {
    setSearchText('')
  }

  return (
    <>
      <Header favoritesCount={favoriteIds.length} />
      <main className="container main-content" id="main-content" tabIndex={-1}>
        <Hero movie={featuredMovie}>
          <MovieSearch value={searchText} onChange={setSearchText} onSubmit={showResults} onClear={clearSearch} />
        </Hero>
        <PremieresSection />
        <MovieList
          movies={movies}
          searchTerm={searchTerm}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onClearSearch={clearSearch}
        />
      </main>
      <Footer />
      <Toast toast={toast} onClose={hideToast} />
    </>
  )
}

export default App
