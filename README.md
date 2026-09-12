_This project was made by Nour Mina as part of the IDS Fintech Backend Training Program_ <br><br>
_website: https://todo-frontend-react-tsx.vercel.app/_ <br>
_github repo: https://github.com/nourrminaa/todo-frontend-react-tsx_ <br>

# 1. Task Tracker

A small browser-only task tracker built with **React + TypeScript + Vite**. There is no backend or database; tasks are stored in the browser's `localStorage`, so they remain available when the app is reopened on the same browser and computer.

## 2. What it does

- Add new tasks
- Edit a task's text
- Delete a task
- Mark a task as completed or incomplete
- Filter tasks by **All**, **Incomplete**, or **Completed**
- Persist tasks to `localStorage`
- Recover safely from malformed persisted data
- Provide keyboard- and screen-reader-friendly controls

## 3. Project structure

```text
├── .husky/
│   ├── pre-commit          lint-staged (eslint + prettier on staged files)
│   └── commit-msg          commitlint
├── .lintstagedrc.js
├── .prettierrc
├── .prettierignore
├── commitlint.config.js
├── eslint.config.js
├── index.html
├── src/
│   ├── main.tsx            entry point: renders <App /> into #root
│   ├── App.tsx             owns task/filter state and persistence
│   ├── App.css
│   ├── index.css           shared styles and accessibility utilities
│   ├── storage.ts          localStorage parsing, validation, and persistence
│   ├── types.ts            shared TypeScript types (Task, FilterType)
│   └── components/
│       ├── TaskForm.tsx    add-task form
│       ├── FilterBar.tsx   All / Incomplete / Completed controls
│       ├── TaskList.tsx    task collection and empty state
│       ├── TaskItem.tsx    one task row (checkbox, edit, delete)
│       └── *.css           one stylesheet file per component
├── package.json
└── vite.config.ts
```

## 4. How the data flows

1. `App.tsx` owns the task list in `useState<Task[]>`.
2. The lazy state initializer calls `loadTasks()`, which parses and validates persisted data. Invalid or malformed data falls back safely instead of crashing the app.
3. Add, toggle, edit, and delete go through `updateTasks()`, which updates React state and then calls `saveTasks()`. A failed write sets `persistenceError` and shows an alert.
4. `App` passes the filtered tasks and handler functions (`addTask`, `toggleTask`, `deleteTask`, `editTask`) to child components as props.
5. `updateTasks()` applies each change to the latest list (kept in a ref) so rapid updates do not overwrite each other.
6. `TaskItem` keeps only editing UI state locally because that state is specific to one row.

## 5. Requirements & how to run it

Check that Node.js is installed:

```bash
node -v
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the checks:

```bash
npm run lint
npm run format:check
npm run build
```

Auto-format files:

```bash
npm run format:fix
```

Then open the URL printed by Vite in your browser.
