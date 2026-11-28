import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import ProductGridSkeleton from '../../components/ProductGridSkeleton/ProductGridSkeleton.jsx'
import useCategories from '../../hooks/useCategories.js'
import useProducts from '../../hooks/useProducts.js'
import productService from '../../services/productService.js'

// Shop catalog: products (with their category nested) and the category filter.
// The selected category lives in the URL (?category=snacks) so it survives a reload.
function CatalogPage({ onNotify }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') ?? ''

  const { status, products, error, isRefreshing, reload, refresh } = useProducts(selectedCategory)
  const categoriesRequest = useCategories()
  const { categories } = categoriesRequest

  const [confirmingId, setConfirmingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  const activeCategory = categories.find((category) => category.slug === selectedCategory)
  const totalCount = categoriesRequest.status === 'ready'
    ? categories.reduce((sum, category) => sum + (category.productCount ?? 0), 0)
    : undefined

  function selectCategory(slug) {
    setConfirmingId(null)
    setSearchParams(slug ? { category: slug } : {})
  }

  async function handleDelete(product) {
    setDeletingId(product.id)
    setDeleteError(null)
    try {
      await productService.remove(product.id)
      onNotify(`🗑 “${product.name}” was deleted`, 'info')
      // Ask the API again: the grid and the category counters update in place.
      refresh()
      categoriesRequest.refresh()
    } catch (requestError) {
      setDeleteError({ name: product.name, error: requestError })
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  return (
    <section className="manage-page shop-page" aria-labelledby="shop-title" aria-busy={status === 'loading' || isRefreshing}>
      <div className="manage-header">
        <div>
          <p className="section-label">Cinema shop</p>
          <h1 id="shop-title">Snacks, drinks &amp; merch</h1>
          <p className="muted-text">
            {activeCategory ? activeCategory.description : 'Everything you can order before the movie starts.'}
          </p>
        </div>
        <div className="cluster">
          <Button variant="ghost" onClick={reload} disabled={status === 'loading'}>Reload</Button>
          <Button to="/shop/new">+ Add product</Button>
        </div>
      </div>

      {categoriesRequest.status === 'loading' && (
        <div className="category-filter" role="status" aria-label="Loading categories">
          {Array.from({ length: 4 }, (_, index) => <span key={index} className="skeleton-block category-chip-skeleton" aria-hidden="true" />)}
        </div>
      )}
      {categoriesRequest.status === 'error' && (
        <div className="alert alert--danger" role="alert">
          <p><strong>Categories could not be loaded.</strong> {categoriesRequest.error.message}</p>
          <Button variant="ghost" onClick={categoriesRequest.reload}>Try again</Button>
        </div>
      )}
      {categoriesRequest.status === 'ready' && (
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={selectCategory} totalCount={totalCount} />
      )}

      {deleteError && (
        <div className="alert alert--danger" role="alert">
          <p><strong>Could not delete “{deleteError.name}”.</strong> {deleteError.error.message}</p>
          <Button variant="ghost" onClick={() => setDeleteError(null)}>Dismiss</Button>
        </div>
      )}

      {status === 'loading' && <ProductGridSkeleton count={6} />}

      {status === 'error' && (
        <ErrorMessage
          title="We couldn't load the products"
          error={error}
          hint="Start the Django API (python manage.py runserver) and press Try again."
          onRetry={reload}
        />
      )}

      {status === 'ready' && products.length === 0 && (
        <div className="empty-state" role="status">
          <p className="empty-state-icon" aria-hidden="true">🛍</p>
          <h2>No products {activeCategory ? `in ${activeCategory.name}` : 'yet'}</h2>
          <p className="muted-text">Add one or choose another category.</p>
          <Button to="/shop/new">Add a product</Button>
        </div>
      )}

      {status === 'ready' && products.length > 0 && (
        <>
          <p className="muted-text results-count" aria-live="polite">
            {isRefreshing
              ? 'Updating the catalog…'
              : `${products.length} ${products.length === 1 ? 'product' : 'products'}${activeCategory ? ` in ${activeCategory.name}` : ''}`}
          </p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isConfirming={confirmingId === product.id}
                isDeleting={deletingId === product.id}
                actionsDisabled={deletingId !== null}
                onAskDelete={() => setConfirmingId(product.id)}
                onCancelDelete={() => setConfirmingId(null)}
                onConfirmDelete={() => handleDelete(product)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default CatalogPage
