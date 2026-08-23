import { createContext, useState, useEffect } from 'react'

export const TaskListContext = createContext(null)

const STORAGE_KEY = 'tasks'

const loadTasks = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

const TaskListContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(loadTasks)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // Add task
  const addTask = (title) => {
    setTasks((prev) => [...prev, { title, id: crypto.randomUUID() }])
  }

  // Remove task
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    // Leaving edit mode pointing at a task that no longer exists would
    // make the next submit silently do nothing.
    setEditItem((current) => (current?.id === id ? null : current))
  }

  // Clear all tasks
  const clearList = () => {
    setTasks([])
    setEditItem(null)
  }

  // Start editing a task
  const findItem = (id) => {
    setEditItem(tasks.find((task) => task.id === id) ?? null)
  }

  // Save an edited task
  const editTask = (title, id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    )
    setEditItem(null)
  }

  return (
    <TaskListContext
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {children}
    </TaskListContext>
  )
}

export default TaskListContextProvider
