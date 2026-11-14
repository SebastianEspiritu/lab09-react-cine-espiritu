// Adapter pattern: turns a raw movie record (the shape an API sends) into the
// model the components use. Components never read the raw field names.
const POSTER_FOLDER = `${import.meta.env.BASE_URL}images/movies/`
const FALLBACK_POSTER = `${POSTER_FOLDER}beyond-orion.svg`
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

function toShowtimes(showTimes) {
  if (typeof showTimes !== 'string') return []
  return showTimes
    .split(/[\s,]+/)
    .filter((time) => TIME_PATTERN.test(time))
    .sort()
}

function toRating(score) {
  const value = Number(score)
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.round(Math.min(value, 100)) / 10
}

function adaptMovie(raw) {
  return {
    id: String(raw.movie_id),
    title: raw.name?.trim() || 'Untitled movie',
    image: raw.poster_file ? `${POSTER_FOLDER}${raw.poster_file}` : FALLBACK_POSTER,
    synopsis: raw.overview?.trim() || 'Synopsis coming soon.',
    classification: raw.age_rating || 'NR',
    rating: toRating(raw.score),
    showtimes: toShowtimes(raw.show_times),
    releaseDate: raw.release_date ?? null,
  }
}

export default adaptMovie
