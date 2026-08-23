import { useContext } from 'react'
import { TaskListContext } from '../contexts/TaskListContext'
import Task from './Task'

const TaskList = () => {
  const { tasks } = useContext(TaskListContext)

  if (!tasks.length) {
    return <div className="no-tasks">No Tasks</div>
  }

  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  )
}

export default TaskList
