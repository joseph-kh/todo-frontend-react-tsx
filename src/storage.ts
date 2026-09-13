import type { Task } from './types'

export const STORAGE_KEY = 'task-tracker-tasks'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false

  const task = value as Record<string, unknown>
  return (
    typeof task.id === 'string' &&
    task.id.length > 0 &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean'
  )
}

export function loadTasks(storage?: Storage): Task[] {
  try {
    const targetStorage = storage ?? window.localStorage
    const saved = targetStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(isTask)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[], storage?: Storage): boolean {
  try {
    const targetStorage = storage ?? window.localStorage
    targetStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}
