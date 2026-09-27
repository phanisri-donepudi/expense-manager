export const CURRENCY = 'INR'
export const LOCALE = 'en-IN'

export const CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Health',
  'Shopping',
  'Entertainment',
  'Education',
  'Other',
]

export const ALL_CATEGORIES = 'All'

const moneyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatMoney(value) {
  return moneyFormatter.format(Number(value) || 0)
}

export function formatDate(isoDate) {
  const [year, month, day] = String(isoDate).split('-').map(Number)
  if (!year || !month || !day) return ''
  return dateFormatter.format(new Date(year, month - 1, day))
}

export function todayISO() {
  const now = new Date()
  const pad = (part) => String(part).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function toAmount(value) {
  return Math.round(Number(value) * 100) / 100
}

export function filterExpenses(expenses, { search, category }) {
  const term = search.trim().toLowerCase()
  return expenses.filter((expense) => {
    const matchesSearch = term === '' || expense.title.toLowerCase().includes(term)
    const matchesCategory =
      category === ALL_CATEGORIES || expense.category === category
    return matchesSearch && matchesCategory
  })
}

export function sortByDateDesc(expenses) {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date))
}

export function totalOf(expenses) {
  return expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0)
}

export function validateExpense({ title, amount, category, date }) {
  const errors = {}
  const rawAmount = String(amount ?? '').trim()

  if (String(title ?? '').trim() === '') {
    errors.title = 'Enter a title.'
  }

  if (rawAmount === '') {
    errors.amount = 'Enter an amount.'
  } else if (!Number.isFinite(Number(rawAmount)) || Number(rawAmount) <= 0) {
    errors.amount = 'Amount must be greater than 0.'
  }

  if (!category) {
    errors.category = 'Select a category.'
  }

  if (!date) {
    errors.date = 'Pick a date.'
  }

  return errors
}
