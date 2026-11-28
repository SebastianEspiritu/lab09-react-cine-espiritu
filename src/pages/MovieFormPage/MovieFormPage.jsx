import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import FormField from '../../components/FormField/FormField.jsx'
import movieService from '../../services/movieService.js'

const POSTERS = [
  'after-the-storm.svg',
  'beyond-orion.svg',
  'city-of-rhythm.svg',
  'desert-echoes.svg',
  'echo-of-mars.svg',
  'midnight-train.svg',
  'neon-harbor.svg',
  'paper-wings.svg',
  'the-glass-forest.svg',
  'the-hidden-garden.svg',
  'the-last-lighthouse.svg',
  'winter-carnival.svg',
]
const CLASSIFICATIONS = ['G', 'PG', 'PG-13', 'R', 'NR']
const EMPTY_MOVIE = {
  title: '',
  synopsis: '',
  posterFile: '',
  classification: 'NR',
  score: '',
  showtimes: '',
  releaseDate: '',
}

// Create form: controlled inputs, POST /movies/ and back to the list.
// Validation is the API's job: its messages are shown next to each field.
function MovieFormPage({ onNotify }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(EMPTY_MOVIE)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // The field changed, so its old API message no longer applies.
    setFieldErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  async function handleSubmit(event) {
    event.preventDefault() // the browser must not reload the page
    setIsSaving(true)
    setFormError(null)
    setFieldErrors({})
    try {
      const created = await movieService.create(values)
      onNotify(`★ “${created.title}” was added`, 'success')
      navigate('/manage')
    } catch (error) {
      setFieldErrors(error.fieldErrors ?? {})
      setFormError(error)
      setIsSaving(false)
    }
  }

  const posterPreview = values.posterFile ? `${import.meta.env.BASE_URL}images/movies/${values.posterFile}` : null

  return (
    <section className="manage-page" aria-labelledby="new-movie-title">
      <div className="manage-header">
        <div>
          <p className="section-label">Back office</p>
          <h1 id="new-movie-title">Add a movie</h1>
          <p className="muted-text">The movie is sent with <code>POST /movies/</code>. The API checks every field.</p>
        </div>
        <Button variant="ghost" to="/manage">← Back to the list</Button>
      </div>

      {formError && (
        <div className="alert alert--danger" role="alert">
          <p><strong>The movie was not saved.</strong> {formError.message}</p>
        </div>
      )}

      <form className="movie-form" onSubmit={handleSubmit} noValidate>
        <div className="movie-form-grid">
          <FormField label="Title *" error={fieldErrors.title}>
            <input className="form-input" name="title" value={values.title} onChange={handleChange} autoComplete="off" />
          </FormField>

          <FormField label="Classification" error={fieldErrors.classification}>
            <select className="form-input" name="classification" value={values.classification} onChange={handleChange}>
              {CLASSIFICATIONS.map((option) => (
                <option key={option} value={option}>{option === 'NR' ? 'NR (not rated)' : option}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Audience score" hint="From 0 to 100. 84 is shown as ★ 8.4." error={fieldErrors.score}>
            <input className="form-input" name="score" type="number" inputMode="numeric" value={values.score} onChange={handleChange} />
          </FormField>

          <FormField label="Showtimes" hint="24-hour format separated by spaces, e.g. 14:00 17:30" error={fieldErrors.showtimes}>
            <input className="form-input" name="showtimes" value={values.showtimes} onChange={handleChange} placeholder="14:00 17:30 20:00" />
          </FormField>

          <FormField label="Release date" hint="Optional." error={fieldErrors.releaseDate}>
            <input className="form-input" name="releaseDate" type="date" value={values.releaseDate} onChange={handleChange} />
          </FormField>

          <FormField label="Poster" error={fieldErrors.posterFile}>
            <select className="form-input" name="posterFile" value={values.posterFile} onChange={handleChange}>
              <option value="">Default poster</option>
              {POSTERS.map((file) => (
                <option key={file} value={file}>{file.replace('.svg', '').replaceAll('-', ' ')}</option>
              ))}
            </select>
          </FormField>

          <div className="movie-form-wide">
            <FormField label="Synopsis" error={fieldErrors.synopsis}>
              <textarea className="form-input" name="synopsis" rows={4} value={values.synopsis} onChange={handleChange} />
            </FormField>
          </div>
        </div>

        {posterPreview && <img className="movie-form-preview" src={posterPreview} alt="Selected poster preview" width="120" height="180" />}

        <div className="cluster movie-form-actions">
          <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save movie'}</Button>
          <Button variant="ghost" to="/manage">Cancel</Button>
        </div>
      </form>
    </section>
  )
}

export default MovieFormPage
