import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MovieCard from './components/MovieCard.jsx'
import movies from './data/movies.js'

function App() {
  const featuredMovie = movies[0]

  return (
    <>
      <Header />
      <main className="container main-content" id="main-content" tabIndex={-1}>
        <Hero movie={featuredMovie} />
        <section className="temporary-section" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
          <p className="section-label">Welcome to Cinema Espiritu</p>
          <h2 id="now-showing-title">Now showing</h2>
          <p className="muted-text">A preview of our movie listings. Showtimes use the 24-hour format.</p>
          <MovieCard movie={featuredMovie} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
