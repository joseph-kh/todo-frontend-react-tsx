import type { Task } from '../types'
import { TaskItem } from './TaskItem'
import './TaskList.css'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface TaskListProps {
  tasks: Task[]
  emptyMessage: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
  onReorder: (activeId: string, overId: string) => void
}

export function TaskList({
  tasks,
  emptyMessage,
  onToggle,
  onDelete,
  onEdit,
  onReorder,
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  if (tasks.length === 0)
    return <p className="task-list-empty">{emptyMessage}</p>

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          onReorder(String(active.id), String(over.id))
      }}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  )
}
