// Grey cards with the shape of a product card, shown while the GET is pending.
function ProductGridSkeleton({ count = 6, label = 'Loading products' }) {
  return (
    <div className="product-grid" role="status" aria-busy="true" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <div className="product-card product-card--skeleton" key={index} aria-hidden="true">
          <div className="skeleton-block product-card-image" />
          <div className="product-card-body">
            <div className="skeleton-block skeleton-line skeleton-line--short" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGridSkeleton
