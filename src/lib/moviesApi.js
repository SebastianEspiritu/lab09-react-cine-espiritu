import httpClient, { toApiError } from './httpClient.js'
import adaptMovie, { RAW_TO_MODEL_FIELDS, toRawMovie } from './adaptMovie.js'

// API client for the movies resource. Components call these functions and
// never write a URL by hand. Every answer goes through the adapter.
const MOVIES_PATH = '/movies/'

export async function listMovies({ signal } = {}) {
  try {
    const { data } = await httpClient.get(MOVIES_PATH, { signal })
    return data.map(adaptMovie)
  } catch (error) {
    if (signal?.aborted) throw error
    throw toApiError(error)
  }
}

export async function createMovie(movie) {
  try {
    const { data } = await httpClient.post(MOVIES_PATH, toRawMovie(movie))
    return adaptMovie(data)
  } catch (error) {
    throw toApiError(error, RAW_TO_MODEL_FIELDS)
  }
}

export async function deleteMovie(movieId) {
  try {
    await httpClient.delete(`${MOVIES_PATH}${encodeURIComponent(movieId)}/`)
  } catch (error) {
    throw toApiError(error)
  }
}
