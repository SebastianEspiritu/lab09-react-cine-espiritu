import Button from '../../components/Button/Button.jsx'

function NotFoundPage() {
  return (
    <section className="empty-state" role="status">
      <p className="empty-state-icon" aria-hidden="true">🎞</p>
      <h1>Page not found</h1>
      <p className="muted-text">That address doesn't exist in Cinema Espiritu.</p>
      <Button to="/">Go to the home page</Button>
    </section>
  )
}

export default NotFoundPage
