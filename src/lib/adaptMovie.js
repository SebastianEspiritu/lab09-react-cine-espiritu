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

// Lab 12: the way back, from the form to the body the API expects.
export const RAW_TO_MODEL_FIELDS = {
  name: 'title',
  overview: 'synopsis',
  poster_file: 'posterFile',
  age_rating: 'classification',
  score: 'score',
  show_times: 'showtimes',
  release_date: 'releaseDate',
}

export function toRawMovie(movie) {
  return {
    name: movie.title,
    overview: movie.synopsis,
    poster_file: movie.posterFile,
    age_rating: movie.classification,
    // Sent as typed: the API validates it and answers with a message if it is wrong.
    score: movie.score === '' ? 0 : movie.score,
    show_times: movie.showtimes.trim().split(/[\s,]+/).filter(Boolean).join(' '),
    release_date: movie.releaseDate || null,
  }
}
