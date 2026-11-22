import Button from '../Button/Button.jsx'

const DEFAULT_HINT = 'Check your connection and try again. The movie listings below still work.'

function ErrorMessage({ title, error, onRetry, hint = DEFAULT_HINT }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message-icon" aria-hidden="true">⚠</p>
      <h3>{title}</h3>
      <p>{error?.message ?? 'Something went wrong.'}</p>
      {hint && <p className="muted-text">{hint}</p>}
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  )
}

export default ErrorMessage
