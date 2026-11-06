import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import movies from './data/movies.js'

function App() {
  const featuredMovie = movies[0]

  return (
    <>
      <Header />
      <main className="container main-content" id="main-content" tabIndex={-1}>
        <Hero movie={featuredMovie} />
        <MovieList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default App
