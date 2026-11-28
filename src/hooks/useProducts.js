import { useCallback } from 'react'
import productService from '../services/productService.js'
import useResource from './useResource.js'

// Products of one category (slug or id), or all of them when it is empty.
function useProducts(category) {
  const load = useCallback(
    ({ signal }) => productService.list({ categoryId: category, signal }),
    [category],
  )
  const { data, ...request } = useResource(load)
  return { ...request, products: data ?? [] }
}

export default useProducts
