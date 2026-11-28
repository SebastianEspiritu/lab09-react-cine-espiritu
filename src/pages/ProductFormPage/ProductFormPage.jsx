import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'
import useCategories from '../../hooks/useCategories.js'
import useProduct from '../../hooks/useProduct.js'
import productService from '../../services/productService.js'
import ProductForm from './ProductForm.jsx'

const EMPTY_PRODUCT = { name: '', categoryId: '', price: '', stock: '', description: '', imageFile: null }

// /shop/new → create (POST). /shop/:productId/edit → load the product and update (PATCH).
function ProductFormPage({ onNotify }) {
  const { productId } = useParams()
  return productId
    ? <EditProduct productId={productId} onNotify={onNotify} />
    : <NewProduct onNotify={onNotify} />
}

function PageHeader({ title, text }) {
  return (
    <div className="manage-header">
      <div>
        <p className="section-label">Cinema shop</p>
        <h1>{title}</h1>
        <p className="muted-text">{text}</p>
      </div>
      <Button variant="ghost" to="/shop">← Back to the catalog</Button>
    </div>
  )
}

function NewProduct({ onNotify }) {
  const navigate = useNavigate()
  const categoriesRequest = useCategories()

  async function createProduct(values) {
    const created = await productService.create(values)
    onNotify(`★ “${created.name}” was added to ${created.category?.name ?? 'the catalog'}`, 'success')
    navigate('/shop')
  }

  return (
    <section className="manage-page">
      <PageHeader title="Add a product" text="The product is sent with POST /products/. The API checks every field." />
      <ProductForm
        initialValues={EMPTY_PRODUCT}
        categoriesRequest={categoriesRequest}
        submitLabel="Save product"
        onSubmit={createProduct}
      />
    </section>
  )
}

function EditProduct({ productId, onNotify }) {
  const navigate = useNavigate()
  const categoriesRequest = useCategories()
  const { status, product, error, reload } = useProduct(productId)

  async function updateProduct(values) {
    const updated = await productService.update(productId, values)
    onNotify(`✎ “${updated.name}” was updated`, 'success')
    navigate('/shop')
  }

  return (
    <section className="manage-page">
      <PageHeader title="Edit product" text={`Loaded with GET /products/${productId}/ and saved with PATCH.`} />

      {status === 'loading' && <p className="muted-text" role="status">Loading the product…</p>}

      {status === 'error' && (
        <ErrorMessage title="We couldn't load this product" error={error} hint="It may have been deleted." onRetry={reload} />
      )}

      {status === 'ready' && (
        <ProductForm
          key={product.id}
          initialValues={{
            name: product.name,
            categoryId: product.category?.id ?? '',
            price: String(product.price),
            stock: String(product.stock),
            description: product.description,
            imageFile: null,
          }}
          currentImageUrl={product.imageUrl}
          categoriesRequest={categoriesRequest}
          submitLabel="Save changes"
          onSubmit={updateProduct}
        />
      )}
    </section>
  )
}

export default ProductFormPage
