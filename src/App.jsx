import { useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import Summary from './components/Summary'
import {
  ALL_CATEGORIES,
  createId,
  filterExpenses,
  sortByDateDesc,
  totalOf,
} from './utils/expenses'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [editingId, setEditingId] = useState(null)

  const visibleExpenses = useMemo(
    () => sortByDateDesc(filterExpenses(expenses, { search, category })),
    [expenses, search, category],
  )

  const total = useMemo(() => totalOf(expenses), [expenses])
  const visibleTotal = useMemo(() => totalOf(visibleExpenses), [visibleExpenses])
  const average = expenses.length > 0 ? total / expenses.length : 0
  const editingExpense =
    expenses.find((expense) => expense.id === editingId) ?? null
  const isFiltered = search.trim() !== '' || category !== ALL_CATEGORIES

  function handleSubmit(values) {
    if (editingId) {
      setExpenses((current) =>
        current.map((expense) =>
          expense.id === editingId ? { ...expense, ...values } : expense,
        ),
      )
      setEditingId(null)
      return
    }

    setExpenses((current) => [...current, { id: createId(), ...values }])
  }

  function handleEdit(expense) {
    setEditingId(expense.id)
  }

  function handleDelete(expense) {
    setExpenses((current) => current.filter((item) => item.id !== expense.id))
    if (expense.id === editingId) {
      setEditingId(null)
    }
  }

  function clearFilters() {
    setSearch('')
    setCategory(ALL_CATEGORIES)
  }

  const today = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Personal Expense Manager</h1>
        <p className="app__subtitle">{today}</p>
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <Summary
            total={total}
            count={expenses.length}
            average={average}
            visibleTotal={visibleTotal}
            isFiltered={isFiltered}
          />

          <div className="card">
            <ExpenseForm
              key={editingId ?? 'new'}
              editingExpense={editingExpense}
              onSubmit={handleSubmit}
              onCancel={() => setEditingId(null)}
            />
          </div>
        </aside>

        <section className="app__content">
          <div className="card">
            <FilterBar
              search={search}
              category={category}
              resultCount={visibleExpenses.length}
              isFiltered={isFiltered}
              onSearchChange={setSearch}
              onCategoryChange={setCategory}
              onClear={clearFilters}
            />
          </div>

          <div className="card card--flush">
            <ExpenseList
              expenses={visibleExpenses}
              hasExpenses={expenses.length > 0}
              isFiltered={isFiltered}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClearFilters={clearFilters}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
