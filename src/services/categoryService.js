import { apiRequest } from './apiClient.js'
import { adaptCategory } from '../lib/adaptProduct.js'

// Categories resource (Lab 13): list, get one, create, update and delete.
const CATEGORIES_PATH = '/categories/'
const detailPath = (categoryId) => `${CATEGORIES_PATH}${encodeURIComponent(categoryId)}/`

async function list({ signal } = {}) {
  const data = await apiRequest({ method: 'get', url: CATEGORIES_PATH, signal })
  return data.map(adaptCategory)
}

async function get(categoryId, { signal } = {}) {
  return adaptCategory(await apiRequest({ method: 'get', url: detailPath(categoryId), signal }))
}

async function create(category) {
  return adaptCategory(await apiRequest({ method: 'post', url: CATEGORIES_PATH, data: category }))
}

async function update(categoryId, changes) {
  return adaptCategory(await apiRequest({ method: 'patch', url: detailPath(categoryId), data: changes }))
}

async function remove(categoryId) {
  await apiRequest({ method: 'delete', url: detailPath(categoryId) })
}

const categoryService = { list, get, create, update, remove }

export default categoryService
