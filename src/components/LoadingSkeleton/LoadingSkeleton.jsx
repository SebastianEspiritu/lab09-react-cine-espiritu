// Grey placeholder cards shown while data is loading.
function LoadingSkeleton({ count = 3, label = 'Loading' }) {
  return (
    <div className="skeleton-grid" role="status" aria-busy="true" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index} aria-hidden="true">
          <div className="skeleton-block skeleton-poster" />
          <div className="skeleton-block skeleton-line skeleton-line--title" />
          <div className="skeleton-block skeleton-line" />
          <div className="skeleton-block skeleton-line skeleton-line--short" />
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
