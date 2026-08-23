import { useState, useContext, useEffect } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const TaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext)
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(editItem ? editItem.title : '')
  }, [editItem])

  const handleSubmit = (e) => {
    e.preventDefault()

    // `required` still lets a whitespace-only title through.
    const trimmed = title.trim()
    if (!trimmed) return

    if (editItem) {
      editTask(trimmed, editItem.id)
    } else {
      addTask(trimmed)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add Task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="task-input"
        aria-label="Task title"
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
          {editItem ? 'Edit Task' : 'Add Task'}
        </button>
        {/* Without an explicit type this button defaults to "submit" and
            would add a task on top of clearing the list. */}
        <button type="button" className="btn clear-btn" onClick={clearList}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default TaskForm
