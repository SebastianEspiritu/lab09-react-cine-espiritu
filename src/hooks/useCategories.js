import categoryService from '../services/categoryService.js'
import useResource from './useResource.js'

// Categories come from the API, never written by hand in the code.
function useCategories() {
  const { data, ...request } = useResource(categoryService.list)
  return { ...request, categories: data ?? [] }
}

export default useCategories
