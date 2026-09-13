import type { Task } from '../types'
import { TaskItem } from './TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  emptyMessage: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

export function TaskList({
  tasks,
  emptyMessage,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="task-list-empty">{emptyMessage}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
