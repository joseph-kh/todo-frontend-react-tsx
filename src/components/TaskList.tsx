import { useRef, useState } from 'react'
import type { Task } from '../types'
import { TaskItem } from './TaskItem'
import './TaskList.css'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
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
  const ignoreItemClickRef = useRef(false)
  const [controlNonce, setControlNonce] = useState(0)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  function handleDragStart() {
    ignoreItemClickRef.current = true
  }

  function handleDragFinish() {
    window.setTimeout(() => {
      ignoreItemClickRef.current = false
      setControlNonce((nonce) => nonce + 1)
    }, 0)
  }

  function handleListClickCapture(event: React.MouseEvent) {
    if (!ignoreItemClickRef.current) return
    event.preventDefault()
    event.stopPropagation()
  }

  function handleToggle(id: string) {
    if (ignoreItemClickRef.current) return
    onToggle(id)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id)
      onReorder(String(active.id), String(over.id))
    handleDragFinish()
  }

  if (tasks.length === 0)
    return <p className="task-list-empty">{emptyMessage}</p>

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragFinish}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="task-list" onClickCapture={handleListClickCapture}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              controlNonce={controlNonce}
              onToggle={handleToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
