// Adapters between the catalog API (Django) and the shape the components use.

export function adaptCategory(raw) {
  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? '',
    productCount: raw.product_count ?? null,
  }
}

export function adaptProduct(raw) {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description ?? '',
    price: Number(raw.price),
    stock: raw.stock,
    isAvailable: raw.is_available,
    imageUrl: raw.image || null,
    category: raw.category ? adaptCategory(raw.category) : null,
  }
}

// API field name → form field name, to show each validation message in place.
export const PRODUCT_FIELD_NAMES = {
  name: 'name',
  description: 'description',
  price: 'price',
  stock: 'stock',
  image: 'image',
  category_id: 'categoryId',
}

// Form values → request body. With a new image the body must be multipart
// (FormData); without one, plain JSON is enough.
export function toProductPayload(values) {
  const fields = {
    name: values.name,
    description: values.description,
    price: values.price,
    stock: values.stock === '' ? 0 : values.stock,
    category_id: values.categoryId,
  }

  if (!values.imageFile) return fields

  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) formData.append(key, value ?? '')
  formData.append('image', values.imageFile)
  return formData
}

const priceFormatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })

export function formatPrice(price) {
  return Number.isFinite(price) ? priceFormatter.format(price) : '—'
}
