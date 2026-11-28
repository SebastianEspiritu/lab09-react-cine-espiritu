import Button from '../Button/Button.jsx'
import { formatPrice } from '../../lib/adaptProduct.js'

// One product of the catalog: image, category, name, price and stock,
// plus the edit and delete actions (delete asks for confirmation).
function ProductCard({ product, isConfirming, isDeleting, actionsDisabled, onAskDelete, onCancelDelete, onConfirmDelete }) {
  return (
    <article className={`product-card${isDeleting ? ' is-deleting' : ''}`} aria-labelledby={`product-${product.id}-name`}>
      {product.imageUrl ? (
        <img className="product-card-image" src={product.imageUrl} alt={product.name} loading="lazy" width="600" height="600" />
      ) : (
        <div className="product-card-image product-card-image--empty" aria-hidden="true">🛍</div>
      )}

      <div className="product-card-body">
        {product.category && (
          <p className="product-card-category" title={product.category.description}>{product.category.name}</p>
        )}
        <h3 className="product-card-name" id={`product-${product.id}-name`}>{product.name}</h3>
        {product.description && <p className="product-card-description">{product.description}</p>}

        <div className="product-card-meta">
          <p className="product-card-price">{formatPrice(product.price)}</p>
          <p className={`stock-badge${product.isAvailable ? '' : ' stock-badge--out'}`}>
            {product.isAvailable ? `${product.stock} in stock` : 'Sold out'}
          </p>
        </div>

        <div className="cluster product-card-actions">
          {isConfirming ? (
            <>
              <Button className="button--danger" onClick={onConfirmDelete} disabled={isDeleting} aria-label={`Confirm deleting ${product.name}`}>
                {isDeleting ? 'Deleting…' : 'Confirm'}
              </Button>
              <Button variant="ghost" onClick={onCancelDelete} disabled={isDeleting}>Cancel</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" to={`/shop/${product.id}/edit`} aria-label={`Edit ${product.name}`}>Edit</Button>
              <Button variant="ghost" onClick={onAskDelete} disabled={actionsDisabled} aria-label={`Delete ${product.name}`}>Delete</Button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
