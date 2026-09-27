import { useState } from 'react'
import {
  CATEGORIES,
  todayISO,
  toAmount,
  validateExpense,
} from '../utils/expenses'

function emptyDraft() {
  return {
    title: '',
    amount: '',
    category: CATEGORIES[0],
    date: todayISO(),
  }
}

export default function ExpenseForm({ editingExpense, onSubmit, onCancel }) {
  const [draft, setDraft] = useState(() => editingExpense ?? emptyDraft())
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(editingExpense)

  function handleChange(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateExpense(draft)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit({
      title: draft.title.trim(),
      amount: toAmount(draft.amount),
      category: draft.category,
      date: draft.date,
    })
    setDraft(emptyDraft())
    setErrors({})
  }

  function handleCancel() {
    setDraft(emptyDraft())
    setErrors({})
    onCancel()
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2 className="card__title">
        {isEditing ? 'Edit expense' : 'Add expense'}
      </h2>

      <div className="field">
        <label className="field__label" htmlFor="title">
          Title
        </label>
        <input
          className="field__control"
          id="title"
          name="title"
          type="text"
          placeholder="Groceries"
          value={draft.title}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.title && <p className="field__error">{errors.title}</p>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="amount">
          Amount
        </label>
        <input
          className="field__control"
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          placeholder="0.00"
          value={draft.amount}
          onChange={handleChange}
        />
        {errors.amount && <p className="field__error">{errors.amount}</p>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="category">
          Category
        </label>
        <select
          className="field__control"
          id="category"
          name="category"
          value={draft.category}
          onChange={handleChange}
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.category && <p className="field__error">{errors.category}</p>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="date">
          Date
        </label>
        <input
          className="field__control"
          id="date"
          name="date"
          type="date"
          value={draft.date}
          onChange={handleChange}
        />
        {errors.date && <p className="field__error">{errors.date}</p>}
      </div>

      <div className="form__actions">
        <button className="btn btn--primary" type="submit">
          {isEditing ? 'Save changes' : 'Add expense'}
        </button>
        {isEditing && (
          <button className="btn btn--ghost" type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
