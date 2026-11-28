import { apiRequest } from './apiClient.js'
import { PRODUCT_FIELD_NAMES, adaptProduct, toProductPayload } from '../lib/adaptProduct.js'

// Products resource (Lab 13): list (optionally by category), get one, create,
// update and delete. Each product already brings its category nested, so the
// catalog needs one request.
const PRODUCTS_PATH = '/products/'
const detailPath = (productId) => `${PRODUCTS_PATH}${encodeURIComponent(productId)}/`

async function list({ categoryId, signal } = {}) {
  const params = categoryId ? { category: categoryId } : undefined
  const data = await apiRequest({ method: 'get', url: PRODUCTS_PATH, params, signal })
  return data.map(adaptProduct)
}

async function get(productId, { signal } = {}) {
  return adaptProduct(await apiRequest({ method: 'get', url: detailPath(productId), signal }))
}

async function create(product) {
  const data = await apiRequest(
    { method: 'post', url: PRODUCTS_PATH, data: toProductPayload(product) },
    { fieldNames: PRODUCT_FIELD_NAMES },
  )
  return adaptProduct(data)
}

// PATCH: only the image changes if a new file was chosen.
async function update(productId, product) {
  const data = await apiRequest(
    { method: 'patch', url: detailPath(productId), data: toProductPayload(product) },
    { fieldNames: PRODUCT_FIELD_NAMES },
  )
  return adaptProduct(data)
}

async function remove(productId) {
  await apiRequest({ method: 'delete', url: detailPath(productId) })
}

const productService = { list, get, create, update, remove }

export default productService
