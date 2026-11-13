import { useEffect, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import MovieSearch from './components/MovieSearch/MovieSearch.jsx'
import movies from './data/movies.js'
import useDebounce from './hooks/useDebounce.js'

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

  // Favorites are shared by every MovieCard and the Header, so they live here.
  const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites)
  // The search text is typed in the Hero but used by MovieList, so it lives here too.
  const [searchText, setSearchText] = useState('')
  const searchTerm = useDebounce(searchText, SEARCH_DELAY_MS)

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
    setFavoriteIds((currentIds) =>
      currentIds.includes(movieId)
        ? currentIds.filter((id) => id !== movieId)
        : [...currentIds, movieId],
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
          <MovieSearch value={searchText} onChange={setSearchText} onSubmit={showResults} />
        </Hero>
        <MovieList
          movies={movies}
          searchTerm={searchTerm}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onClearSearch={clearSearch}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
