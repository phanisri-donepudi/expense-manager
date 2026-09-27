import { ALL_CATEGORIES, CATEGORIES } from '../utils/expenses'

export default function FilterBar({
  search,
  category,
  resultCount,
  isFiltered,
  onSearchChange,
  onCategoryChange,
  onClear,
}) {
  return (
    <div className="filters">
      <div className="field field--grow">
        <label className="field__label" htmlFor="search">
          Search
        </label>
        <input
          className="field__control"
          id="search"
          type="search"
          placeholder="Search by title"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="category-filter">
          Category
        </label>
        <select
          className="field__control"
          id="category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value={ALL_CATEGORIES}>{ALL_CATEGORIES}</option>
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__footer">
        <p className="filters__count">
          {resultCount === 1 ? '1 expense' : `${resultCount} expenses`} shown
        </p>
        {isFiltered && (
          <button className="btn btn--ghost btn--sm" type="button" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
