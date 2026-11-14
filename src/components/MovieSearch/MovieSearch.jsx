import { useId } from 'react'
import Button from '../Button/Button.jsx'

function MovieSearch({ value, onChange, onSubmit, onClear }) {
  const inputId = useId()

  function handleChange(event) {
    console.log(`[MovieSearch] keystroke: "${event.target.value}"`)
    onChange(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="movie-search" role="search" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor={inputId}>Search the listings</label>
      <div className="movie-search-row">
        <input
          className="form-input"
          id={inputId}
          type="search"
          placeholder="Try “storm” or “PG-13”"
          autoComplete="off"
          value={value}
          onChange={handleChange}
        />
        <Button type="submit">Search</Button>
        {value !== '' && (
          <Button variant="ghost" onClick={onClear} aria-label="Clear search">
            Clear
          </Button>
        )}
      </div>
    </form>
  )
}

export default MovieSearch
