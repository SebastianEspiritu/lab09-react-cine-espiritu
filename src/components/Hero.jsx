function Hero({ movie }) {
  const { image, title, synopsis, classification, rating } = movie

  return (
    <section className="hero" aria-labelledby="featured-movie-title">
      <img
        className="hero-poster"
        src={image}
        alt={`Poster for ${title}`}
        width="600"
        height="900"
        fetchPriority="high"
      />
      <div className="hero-content">
        <p className="section-label">Featured movie</p>
        <h1 id="featured-movie-title">{title}</h1>
        <p className="hero-synopsis">{synopsis}</p>
        <dl className="hero-details">
          <div>
            <dt>Classification</dt>
            <dd>{classification}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd><span aria-hidden="true">★ </span>{rating} out of 10</dd>
          </div>
        </dl>
        <a className="contact-link" href="#now-showing">Explore now showing</a>
      </div>
    </section>
  )
}

export default Hero
