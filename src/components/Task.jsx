import { useContext } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const Task = ({ task }) => {
  const { removeTask, findItem } = useContext(TaskListContext)

  return (
    <li className="list-item">
      <span>{task.title}</span>
      <div>
        <button
          type="button"
          className="btn-delete task-btn"
          onClick={() => removeTask(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <i className="fas fa-trash-alt" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          className="btn-edit task-btn"
          onClick={() => findItem(task.id)}
          aria-label={`Edit ${task.title}`}
        >
          <i className="fas fa-pen" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  )
}

export default Task
