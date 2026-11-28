import { apiRequest } from './apiClient.js'
import adaptMovie, { RAW_TO_MODEL_FIELDS, toRawMovie } from '../lib/adaptMovie.js'

// Movies resource (Lab 12). Components never write a URL: they call these.
const MOVIES_PATH = '/movies/'

async function list({ signal } = {}) {
  const data = await apiRequest({ method: 'get', url: MOVIES_PATH, signal })
  return data.map(adaptMovie)
}

async function create(movie) {
  const data = await apiRequest(
    { method: 'post', url: MOVIES_PATH, data: toRawMovie(movie) },
    { fieldNames: RAW_TO_MODEL_FIELDS },
  )
  return adaptMovie(data)
}

async function remove(movieId) {
  await apiRequest({ method: 'delete', url: `${MOVIES_PATH}${encodeURIComponent(movieId)}/` })
}

const movieService = { list, create, remove }

export default movieService
