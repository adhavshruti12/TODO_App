import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'
import { motion } from 'framer-motion'

function TodoForm() {
  const [text, setText] = useState('')
  const { addTodo } = useTodo()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (text.trim() !== '') {
      addTodo(text)
      setText('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input flex-1"
        />
        <motion.button
          type="submit"
          className="ml-2 btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={text.trim() === ''}
        >
          Add Task
        </motion.button>
      </div>
    </form>
  )
}

export default TodoForm