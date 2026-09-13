import { useState } from 'react'
import type { Task } from '../types'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)
  const checkboxId = `task-${task.id}`
  const trimmedDraft = draftText.trim()
  const isDraftEmpty = trimmedDraft === ''

  function startEditing() {
    setDraftText(task.text)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraftText(task.text)
    setIsEditing(false)
  }

  function saveEditing() {
    if (isDraftEmpty) return

    onEdit(task.id, trimmedDraft)
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') saveEditing()
    if (e.key === 'Escape') cancelEditing()
  }

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>
            Edit task: {task.text}
          </label>
          <input
            id={`edit-${task.id}`}
            type="text"
            className="task-item-edit-input"
            value={draftText}
            aria-invalid={isDraftEmpty}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            type="button"
            className="task-item-btn task-item-save"
            onClick={saveEditing}
            disabled={isDraftEmpty}
          >
            Save
          </button>
          <button
            type="button"
            className="task-item-btn"
            onClick={cancelEditing}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <input
            id={checkboxId}
            type="checkbox"
            className="task-item-checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <label
            htmlFor={checkboxId}
            className={
              task.completed
                ? 'task-item-text task-item-text-done'
                : 'task-item-text'
            }
          >
            {task.text}
          </label>
          <button
            type="button"
            className="task-item-btn"
            onClick={startEditing}
          >
            Edit
          </button>
          <button
            type="button"
            className="task-item-btn task-item-delete"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  )
}
