import React from 'react'
import { useTodo } from '../contexts/TodoContext'
import TodoItem from './TodoItem'
import { motion } from 'framer-motion'

function TodoList() {
  const { todos } = useTodo()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="mt-6">
      {todos.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">
          {/* ... No tasks UI ... */}
        </div>
      )}
    </div>
  )
}

export default TodoList
