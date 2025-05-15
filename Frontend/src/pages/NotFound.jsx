import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <div className="max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-primary-500 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 mb-6 dark:bg-primary-900 dark:text-primary-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn btn-primary px-6 py-3">
          Go Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound