import { useRef, useState } from 'react'
import type { Task, FilterType } from './types'
import { celebrateAllTasksDone } from './celebrate'
import { loadTasks, saveTasks } from './storage'
import { TaskForm } from './components/TaskForm'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'
import './App.css'

function getEmptyMessage(filter: FilterType) {
  if (filter === 'completed') return 'No completed tasks.'
  if (filter === 'incomplete') return 'No incomplete tasks.'
  return 'No tasks yet.'
}

function App() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [persistenceError, setPersistenceError] = useState(false)
  const tasksRef = useRef(tasks)

  function updateTasks(updater: (currentTasks: Task[]) => Task[]) {
    const previousTasks = tasksRef.current
    const nextTasks = updater(previousTasks)
    const wasAllDone =
      previousTasks.length > 0 && previousTasks.every((task) => task.completed)
    const isAllDone =
      nextTasks.length > 0 && nextTasks.every((task) => task.completed)

    tasksRef.current = nextTasks
    setTasks(nextTasks)
    setPersistenceError(!saveTasks(nextTasks))

    if (!wasAllDone && isAllDone) celebrateAllTasksDone()
  }

  function addTask(text: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }

    updateTasks((currentTasks) => [...currentTasks, newTask])
  }

  function toggleTask(id: string) {
    updateTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id: string) {
    updateTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function editTask(id: string, newText: string) {
    updateTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'incomplete') return !task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const progress =
    tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100

  return (
    <main className="app-card">
      <header className="app-header">
        <div className="app-header-top">
          <h1>Task Tracker</h1>
          <span className="app-count" aria-live="polite">
            {completedCount}/{tasks.length} done
          </span>
        </div>
        <div
          className="app-progress-track"
          role="progressbar"
          aria-label="Task completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-valuetext={`${completedCount} of ${tasks.length} tasks completed`}
        >
          <div
            className="app-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {persistenceError && (
        <p className="app-storage-error" role="alert">
          Changes could not be saved in this browser.
        </p>
      )}

      <TaskForm onAddTask={addTask} />
      <FilterBar currentFilter={filter} onChangeFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        emptyMessage={getEmptyMessage(filter)}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </main>
  )
}

export default App
