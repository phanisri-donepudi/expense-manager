import ExpenseItem from './ExpenseItem'

export default function ExpenseList({
  expenses,
  hasExpenses,
  isFiltered,
  onEdit,
  onDelete,
  onClearFilters,
}) {
  if (expenses.length === 0) {
    return (
      <div className="empty">
        <p className="empty__title">
          {hasExpenses ? 'No matching expenses' : 'No expenses yet'}
        </p>
        <p className="empty__text">
          {hasExpenses
            ? 'Try a different search term or category.'
            : 'Add your first expense using the form to start tracking your spending.'}
        </p>
        {hasExpenses && isFiltered && (
          <button className="btn btn--ghost" type="button" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <ul className="list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
