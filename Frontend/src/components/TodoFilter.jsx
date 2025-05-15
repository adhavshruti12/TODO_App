import React from 'react'
import { useTodo } from '../contexts/TodoContext'
import { motion } from 'framer-motion'

function TodoFilter() {
  const { filter, setFilter } = useTodo()
  
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ]
  
  return (
    <div className="flex items-center space-x-2 mt-6">
      <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
      <div className="flex space-x-1">
        {filters.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => setFilter(value)}
            className={`filter-btn ${filter === value ? 'filter-btn-active' : 'text-gray-600 dark:text-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TodoFilter