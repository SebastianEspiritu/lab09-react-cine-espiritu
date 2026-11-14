import Button from '../Button/Button.jsx'

function ErrorMessage({ title, error, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message-icon" aria-hidden="true">⚠</p>
      <h3>{title}</h3>
      <p>{error?.message ?? 'Something went wrong.'}</p>
      <p className="muted-text">Check your connection and try again. The movie listings below still work.</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  )
}

export default ErrorMessage
