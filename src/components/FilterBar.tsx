import type { FilterType } from '../types'
import './FilterBar.css'

interface FilterBarProps {
  currentFilter: FilterType
  onChangeFilter: (filter: FilterType) => void
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Incomplete', value: 'incomplete' },
  { label: 'Completed', value: 'completed' },
]

export function FilterBar({ currentFilter, onChangeFilter }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.value

        return (
          <button
            type="button"
            key={filter.value}
            className={
              isActive ? 'filter-button filter-button-active' : 'filter-button'
            }
            aria-pressed={isActive}
            onClick={() => onChangeFilter(filter.value)}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
