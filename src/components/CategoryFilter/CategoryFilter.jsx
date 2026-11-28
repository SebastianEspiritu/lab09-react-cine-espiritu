// Category chips loaded from the API. `selected` is a category slug ('' = all).
function CategoryFilter({ categories, selected, onSelect, totalCount }) {
  const options = [{ slug: '', name: 'All', productCount: totalCount }, ...categories]

  return (
    <div className="category-filter" role="group" aria-label="Filter products by category">
      {options.map((category) => {
        const isActive = category.slug === selected
        return (
          <button
            key={category.slug || 'all'}
            type="button"
            className={`category-chip${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onSelect(category.slug)}
            title={category.description || undefined}
          >
            {category.name}
            {typeof category.productCount === 'number' && (
              <span className="category-chip-count">{category.productCount}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
