import { useState } from 'react/cjs/react.development';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './index.css';


function App() {
 const [showAddTask, setShowAddTask] = useState(false)  
  const  [ tasks, setTasks] = useState(
    [
        {
            id:1,
            text: 'Doctors Apointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
          id:2,
          text: 'Meeting at School',
          day: 'Feb 6th at 2:30pm',
          reminder: true,
      },
      {
          id:3,
          text: 'Food Shopping',
          day: 'Feb 5th at 2:30pm',
          reminder: false,
      }
    ]
)

//Add task 
const addTask = (task) =>{
  const id = Math.floor(Math.random() * 10000) +1
  const newTask = { id, ...task }
  setTasks([...Tasks,newTask])
}


//delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

//Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id
  ? { ...task, reminder:
  !task.reminder } : task
  )
  )
}

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask
      (!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder} /> : (
        'No Task to Show')}
    </div>
  );
}

export default App;
