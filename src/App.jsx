import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import Toast from './components/Toast/Toast.jsx'
import useToast from './hooks/useToast.js'
import HomePage from './pages/HomePage/HomePage.jsx'
import MovieFormPage from './pages/MovieFormPage/MovieFormPage.jsx'
import MoviesPage from './pages/MoviesPage/MoviesPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

// v2: since Lab 12 the ids come from the API (numbers), not the old slugs.
const FAVORITES_STORAGE_KEY = 'cinema-espiritu:favorites:v2'

function readStoredFavorites() {
  try {
    const storedValue = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY))
    return Array.isArray(storedValue) ? storedValue.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function App() {
  // Header (the counter) and the pages are siblings, so favorites and the
  // toast live in their closest common ancestor: App.
  const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites)
  const { toast, showToast, hideToast } = useToast(3000)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Storage may be unavailable (private mode or full); favorites still work in memory.
    }
  }, [favoriteIds])

  function toggleFavorite(movie) {
    const wasFavorite = favoriteIds.includes(movie.id)

    setFavoriteIds((currentIds) =>
      currentIds.includes(movie.id)
        ? currentIds.filter((id) => id !== movie.id)
        : [...currentIds, movie.id],
    )
    showToast(
      wasFavorite ? `☆ “${movie.title}” removed from favorites` : `★ “${movie.title}” added to favorites`,
      wasFavorite ? 'info' : 'success',
    )
  }

  // A deleted movie can't stay in the favorites counter.
  function forgetFavorite(movieId) {
    setFavoriteIds((currentIds) => currentIds.filter((id) => id !== movieId))
  }

  return (
    <>
      <Header favoritesCount={favoriteIds.length} />
      <main className="container main-content" id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />} />
          <Route path="/manage" element={<MoviesPage onNotify={showToast} onMovieDeleted={forgetFavorite} />} />
          <Route path="/manage/new" element={<MovieFormPage onNotify={showToast} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Toast toast={toast} onClose={hideToast} />
    </>
  )
}

export default App
