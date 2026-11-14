import Button from '../Button/Button.jsx'

function Toast({ toast, onClose }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className={`toast toast--${toast.tone}`} key={toast.id}>
          <p className="toast-message">{toast.message}</p>
          <Button variant="ghost" className="toast-close" aria-label="Close notification" onClick={onClose}>
            ✕
          </Button>
        </div>
      )}
    </div>
  )
}

export default Toast
