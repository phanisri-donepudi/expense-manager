# Personal Expense Manager

A small React app for recording daily expenses, searching them, filtering by category, and tracking a running total.

Stack: **React 19 | CSS | Vite**. No backend — all data lives in React state.

## Features

- Add an expense with **title, amount, category, and date**
- Display expenses through reusable components
- Edit and delete expense records
- Search expenses by title (case-insensitive) and filter by category
- Calculate and display the total expense amount, plus record count and average
- Form validation for title, amount, category, and date
- Responsive layout, plus light and dark colour schemes

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Project structure

```
src/
  App.jsx                  state owner: expenses, search, category filter, editing id
  components/
    Summary.jsx            total, record count, average
    ExpenseForm.jsx        controlled form used for both add and edit
    FilterBar.jsx          search input + category select + clear
    ExpenseList.jsx        list container and empty states
    ExpenseItem.jsx        a single expense row
  utils/
    expenses.js            categories, currency/date formatting, filter, total, validation
  index.css                design tokens, resets, shared form/button styles
  App.css                  layout and component styles
```

### State flow

`App` owns the single `expenses` array and passes everything down as props:

- `handleSubmit` adds a new record, or updates the one with `editingId`
- `handleEdit` / `handleDelete` act on a record by id
- `filterExpenses` + `sortByDateDesc` derive the visible list from `search` and `category`
- `totalOf` derives the totals shown in `Summary`

`ExpenseForm` keeps its own field state and is remounted via a `key` when the edit
target changes, so switching between add and edit never needs state syncing.

## Notes

- The display currency is set by `CURRENCY` in `src/utils/expenses.js`.
- Data is held in React state only, so it resets on refresh. See the deployment
  checklist below if you need it to persist.

## Deploying to Netlify

1. Run `npm run build` locally and verify the production build.
2. Push the project to GitHub and import the repository into Netlify.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy, then verify the form, filters, totals, and responsive layout on the live URL.
