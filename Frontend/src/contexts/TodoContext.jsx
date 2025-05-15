import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      if (!currentUser) return;
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        setTodos(res.data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchTodos();
  }, [currentUser]);

  // Add a new todo
  const addTodo = async (text) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        { name: text },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setTodos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  // Toggle completion
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  // Update task name
  const updateTodo = async (id, text) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { name: text },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  // Delete task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  // Filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const value = {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
