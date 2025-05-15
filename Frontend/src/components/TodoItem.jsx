import React, { useState, useRef, useEffect } from 'react'
import { useTodo } from '../contexts/TodoContext'
import { motion } from 'framer-motion'

function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.name)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleToggle = () => {
    toggleTodo(todo._id, todo.completed)
  }

  const handleDelete = () => {
    deleteTodo(todo._id)
  }

  const handleEdit = () => setIsEditing(true)

  const handleUpdate = () => {
    if (editText.trim() !== '') {
      updateTodo(todo._id, editText)
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUpdate()
    else if (e.key === 'Escape') {
      setEditText(todo.name)
      setIsEditing(false)
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div className={`task-item ${todo.completed ? 'completed-task' : ''}`} variants={item} layout>
      <div className="flex items-center flex-1 max-w-full">
        <motion.button
          className={`flex-shrink-0 w-5 h-5 mr-3 rounded-full border ${
            todo.completed 
              ? 'bg-primary-500 border-primary-500 dark:bg-primary-600 dark:border-primary-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onClick={handleToggle}
          whileTap={{ scale: 0.9 }}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && (
            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 input py-1 px-2 text-sm"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className={`flex-1 truncate ${todo.completed ? 'completed-text' : ''}`} onDoubleClick={handleEdit}>
            <p>{todo.name}</p>
          </span>
        )}
      </div>

      <div className="flex items-center ml-4 space-x-2">
        {!isEditing && (
          <motion.button
            onClick={handleEdit}
            className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </motion.button>
        )}

        <motion.button
          onClick={handleDelete}
          className="text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TodoItem
