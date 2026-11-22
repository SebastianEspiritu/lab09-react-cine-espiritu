import { cloneElement, useId } from 'react'

// Label + control + hint + the error message the API sent for this field.
// The control (input, select or textarea) is passed as the only child.
function FormField({ label, hint, error, children }) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`form-field${error ? ' form-field--invalid' : ''}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      {cloneElement(children, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {hint && <p className="form-hint" id={hintId}>{hint}</p>}
      {error && <p className="form-error" id={errorId}>{error}</p>}
    </div>
  )
}

export default FormField
