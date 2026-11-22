// Grey rows with the shape of the movies table, shown while the GET is pending.
function TableSkeleton({ rows = 5, columns = 5, label = 'Loading' }) {
  return (
    <div className="table-skeleton" role="status" aria-busy="true" aria-label={label}>
      {Array.from({ length: rows }, (_, row) => (
        <div className="table-skeleton-row" key={row} aria-hidden="true">
          <div className="skeleton-block table-skeleton-thumb" />
          {Array.from({ length: columns - 1 }, (_, column) => (
            <div className="skeleton-block skeleton-line" key={column} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton
