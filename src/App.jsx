import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="container main-content" id="main-content" tabIndex={-1}>
        <section className="temporary-section" id="now-showing" tabIndex={-1} aria-labelledby="now-showing-title">
          <p className="section-label">Welcome to Cinema Espiritu</p>
          <h1 id="now-showing-title">Now showing</h1>
          <p className="muted-text">Our movie listings are coming soon. Visit our contact section to find out where we are.</p>
          <a className="contact-link" href="#contact">Contact the cinema</a>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
