import { useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton.jsx'
import useMovies from '../../hooks/useMovies.js'
import { API_BASE_URL } from '../../services/apiClient.js'
import movieService from '../../services/movieService.js'

// Management page: GET the movies when it mounts and DELETE them one by one.
function MoviesPage({ onNotify, onMovieDeleted }) {
  const { status, movies, error, isRefreshing, reload, refresh } = useMovies()
  const [confirmingId, setConfirmingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  async function handleDelete(movie) {
    setDeletingId(movie.id)
    setDeleteError(null)
    try {
      await movieService.remove(movie.id)
      onMovieDeleted(movie.id)
      onNotify(`🗑 “${movie.title}” was deleted`, 'info')
      // Ask the API again so the table shows what is really stored.
      refresh()
    } catch (requestError) {
      setDeleteError({ title: movie.title, error: requestError })
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  return (
    <section className="manage-page" aria-labelledby="manage-title" aria-busy={status === 'loading' || isRefreshing}>
      <div className="manage-header">
        <div>
          <p className="section-label">Back office</p>
          <h1 id="manage-title">Manage movies</h1>
          <p className="muted-text">
            Data from <code>GET {API_BASE_URL}/movies/</code>
          </p>
        </div>
        <div className="cluster">
          <Button variant="ghost" onClick={reload} disabled={status === 'loading'}>Reload</Button>
          <Button to="/manage/new">+ Add movie</Button>
        </div>
      </div>

      {deleteError && (
        <div className="alert alert--danger" role="alert">
          <p>
            <strong>Could not delete “{deleteError.title}”.</strong> {deleteError.error.message}
          </p>
          <Button variant="ghost" onClick={() => setDeleteError(null)}>Dismiss</Button>
        </div>
      )}

      {status === 'loading' && <TableSkeleton rows={6} columns={6} label="Loading movies" />}

      {status === 'error' && (
        <ErrorMessage
          title="We couldn't load the movies"
          error={error}
          hint="Start the Django API (python manage.py runserver) and press Try again."
          onRetry={reload}
        />
      )}

      {status === 'ready' && movies.length === 0 && (
        <div className="empty-state" role="status">
          <p className="empty-state-icon" aria-hidden="true">🎬</p>
          <h2>No movies yet</h2>
          <p className="muted-text">The API answered with an empty list.</p>
          <Button to="/manage/new">Add the first movie</Button>
        </div>
      )}

      {status === 'ready' && movies.length > 0 && (
        <div className="table-wrapper">
          <table className="movies-table">
            <caption className="visually-hidden">Movies stored in the API</caption>
            <thead>
              <tr>
                <th scope="col">Poster</th>
                <th scope="col">Title</th>
                <th scope="col">Classification</th>
                <th scope="col">Rating</th>
                <th scope="col">Showtimes</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => {
                const isDeleting = deletingId === movie.id
                const isConfirming = confirmingId === movie.id
                return (
                  <tr key={movie.id} className={isDeleting ? 'is-deleting' : undefined}>
                    <td><img className="movies-table-thumb" src={movie.image} alt="" width="48" height="72" /></td>
                    <th scope="row">
                      {movie.title}
                      <span className="movies-table-id">#{movie.id}</span>
                    </th>
                    <td>{movie.classification}</td>
                    <td>{movie.rating === null ? '—' : `★ ${movie.rating.toFixed(1)}`}</td>
                    <td>{movie.showtimes.length > 0 ? movie.showtimes.join(' · ') : '—'}</td>
                    <td className="movies-table-actions">
                      {isConfirming ? (
                        <div className="cluster">
                          <Button
                            className="button--danger"
                            onClick={() => handleDelete(movie)}
                            disabled={isDeleting}
                            aria-label={`Confirm deleting ${movie.title}`}
                          >
                            {isDeleting ? 'Deleting…' : 'Confirm'}
                          </Button>
                          <Button variant="ghost" onClick={() => setConfirmingId(null)} disabled={isDeleting}>Cancel</Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => setConfirmingId(movie.id)}
                          disabled={deletingId !== null}
                          aria-label={`Delete ${movie.title}`}
                        >
                          Delete
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="muted-text table-footnote" aria-live="polite">
            {isRefreshing ? 'Refreshing the list…' : `${movies.length} ${movies.length === 1 ? 'movie' : 'movies'} in the API.`}
          </p>
        </div>
      )}
    </section>
  )
}

export default MoviesPage
