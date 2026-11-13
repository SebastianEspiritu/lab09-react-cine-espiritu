function Header({ favoritesCount }) {
  return (
    <header className="site-header" id="home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-content">
        <a className="brand" href="#home" aria-label="Cinema Espiritu home">
          <span className="brand-mark" aria-hidden="true">CE</span>
          <span>
            <strong className="brand-name">Cinema Espiritu</strong>
            <span className="brand-tagline">Stories worth sharing</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <ul className="navigation-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#now-showing">Now showing</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <span className="favorites-badge" aria-live="polite">
                <span className="visually-hidden">Saved: </span>
                <span aria-hidden="true">★</span>
                {favoritesCount} {favoritesCount === 1 ? 'favorite' : 'favorites'}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
