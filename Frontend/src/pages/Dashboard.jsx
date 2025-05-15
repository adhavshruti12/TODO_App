import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import TodoFilter from '../components/TodoFilter'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

function Dashboard() {
  const { currentUser } = useAuth()
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        className="card" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentUser ? `${currentUser.name}'s Tasks` : 'Your Tasks'}
          </h1>
          <TodoFilter />
        </div>
        
        <TodoForm />
        <TodoList />
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pro tip: Double-click on a task to edit it.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard