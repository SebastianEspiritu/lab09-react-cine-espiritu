import { Link, NavLink } from 'react-router-dom'

function Header({ favoritesCount }) {
  return (
    <header className="site-header" id="home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="container header-content">
        <Link className="brand" to="/" aria-label="Cinema Espiritu home">
          <span className="brand-mark" aria-hidden="true">CE</span>
          <span>
            <strong className="brand-name">Cinema Espiritu</strong>
            <span className="brand-tagline">Stories worth sharing</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="navigation-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><Link to="/#coming-soon">Coming soon</Link></li>
            <li><Link to="/#now-showing">Now showing</Link></li>
            <li><a href="#contact">Contact</a></li>
            <li><NavLink to="/manage">Manage movies</NavLink></li>
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
