import { formatDate, formatMoney } from '../utils/expenses'

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const badgeClass = `expense__badge expense__badge--${expense.category.toLowerCase()}`

  return (
    <li className="expense">
      <span className={badgeClass} aria-hidden="true">
        {expense.category.charAt(0)}
      </span>

      <div className="expense__info">
        <p className="expense__title">{expense.title}</p>
        <p className="expense__meta">
          <span className="chip">{expense.category}</span>
          <time className="expense__date" dateTime={expense.date}>
            {formatDate(expense.date)}
          </time>
        </p>
      </div>

      <p className="expense__amount">{formatMoney(expense.amount)}</p>

      <div className="expense__actions">
        <button
          className="btn btn--ghost btn--sm"
          type="button"
          onClick={() => onEdit(expense)}
          aria-label={`Edit ${expense.title}`}
        >
          Edit
        </button>
        <button
          className="btn btn--danger btn--sm"
          type="button"
          onClick={() => onDelete(expense)}
          aria-label={`Delete ${expense.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
