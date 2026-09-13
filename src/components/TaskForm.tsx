import { useState } from 'react'
import './TaskForm.css'

interface TaskFormProps {
  onAddTask: (text: string) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState('')
  const trimmedText = text.trim()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (trimmedText === '') return

    onAddTask(trimmedText)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        type="text"
        className="task-form-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="task-form-button"
        disabled={trimmedText === ''}
      >
        Add
      </button>
    </form>
  )
}
