import { formatMoney } from '../utils/expenses'

export default function Summary({ total, count, average, visibleTotal, isFiltered }) {
  return (
    <section className="summary" aria-label="Expense summary">
      <div className="summary__headline">
        <p className="summary__label">Total expense</p>
        <p className="summary__amount">{formatMoney(total)}</p>
        <p className="summary__hint">
          {count === 1 ? '1 record' : `${count} records`} tracked
        </p>
      </div>

      <dl className="summary__stats">
        <div className="summary__stat">
          <dt>Average</dt>
          <dd>{formatMoney(average)}</dd>
        </div>
        {isFiltered && (
          <div className="summary__stat">
            <dt>Matching</dt>
            <dd>{formatMoney(visibleTotal)}</dd>
          </div>
        )}
      </dl>
    </section>
  )
}
