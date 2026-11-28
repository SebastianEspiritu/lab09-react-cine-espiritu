import { useCallback } from 'react'
import productService from '../services/productService.js'
import useResource from './useResource.js'

// One product, used to fill the edit form.
function useProduct(productId) {
  const load = useCallback(
    ({ signal }) => productService.get(productId, { signal }),
    [productId],
  )
  const { data, ...request } = useResource(load)
  return { ...request, product: data }
}

export default useProduct
