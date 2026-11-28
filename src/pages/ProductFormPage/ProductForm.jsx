import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import FormField from '../../components/FormField/FormField.jsx'

// Controlled product form, shared by "Add product" and "Edit product".
// Validation is the API's job: `fieldErrors` holds its messages per field.
function ProductForm({ initialValues, currentImageUrl = null, categoriesRequest, submitLabel, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Free the temporary URL of the chosen image when it changes or on unmount.
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  function clearFieldError(name) {
    setFieldErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    clearFieldError(name)
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0] ?? null
    setValues((current) => ({ ...current, imageFile: file }))
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
    clearFieldError('image')
  }

  async function handleSubmit(event) {
    event.preventDefault() // the browser must not reload the page
    setIsSaving(true)
    setFormError(null)
    setFieldErrors({})
    try {
      await onSubmit(values)
    } catch (error) {
      setFieldErrors(error.fieldErrors ?? {})
      setFormError(error)
      setIsSaving(false)
    }
  }

  const { status: categoriesStatus, categories } = categoriesRequest
  const shownImage = previewUrl ?? currentImageUrl

  return (
    <>
      {formError && (
        <div className="alert alert--danger" role="alert">
          <p><strong>The product was not saved.</strong> {formError.message}</p>
        </div>
      )}

      <form className="movie-form" onSubmit={handleSubmit} noValidate>
        <div className="movie-form-grid">
          <FormField label="Name *" error={fieldErrors.name}>
            <input className="form-input" name="name" value={values.name} onChange={handleChange} autoComplete="off" />
          </FormField>

          <FormField
            label="Category *"
            error={fieldErrors.categoryId}
            hint={categoriesStatus === 'loading' ? 'Loading categories…' : undefined}
          >
            <select
              className="form-input"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
              disabled={categoriesStatus !== 'ready'}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Price (S/) *" hint="For example 18.50" error={fieldErrors.price}>
            <input className="form-input" name="price" type="number" step="0.01" inputMode="decimal" value={values.price} onChange={handleChange} />
          </FormField>

          <FormField label="Stock" hint="Units available. 0 shows “Sold out”." error={fieldErrors.stock}>
            <input className="form-input" name="stock" type="number" step="1" inputMode="numeric" value={values.stock} onChange={handleChange} />
          </FormField>

          <div className="movie-form-wide">
            <FormField label="Description" error={fieldErrors.description}>
              <textarea className="form-input" name="description" rows={3} value={values.description} onChange={handleChange} />
            </FormField>
          </div>

          <div className="movie-form-wide">
            <FormField label="Image" hint={currentImageUrl ? 'PNG or JPG. Leave it empty to keep the current image.' : 'PNG or JPG (optional).'} error={fieldErrors.image}>
              <input className="form-input" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            </FormField>
          </div>
        </div>

        {categoriesStatus === 'error' && (
          <div className="alert alert--danger" role="alert">
            <p><strong>Categories could not be loaded.</strong> {categoriesRequest.error.message}</p>
            <Button variant="ghost" onClick={categoriesRequest.reload}>Try again</Button>
          </div>
        )}

        {shownImage && <img className="product-form-preview" src={shownImage} alt="Product image preview" width="160" height="160" />}

        <div className="cluster movie-form-actions">
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : submitLabel}</Button>
          <Button variant="ghost" to="/shop">Cancel</Button>
        </div>
      </form>
    </>
  )
}

export default ProductForm
