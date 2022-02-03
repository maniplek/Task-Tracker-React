import { useState, useEffect } from 'react/cjs/react.development';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './index.css';
import Footer from './components/Footer';
// import About from './components/About';


function App() {
 const [showAddTask, setShowAddTask] = useState(false)  
  const  [ tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  //Fetch Tasks
  const fetchTasks = async (id) => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data 
  }

    //Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data 
    }

//Add task 
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json' 
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()
  setTasks([ ...tasks, data ])
}




// const addTask = (task) =>{
//   const id = Math.floor(Math.random() * 10000) +1
//   const newTask = { id, ...task }
//   setTasks([...Tasks,newTask])
// }


//delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

//Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,
  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) => task.id === id
  ? { ...task, reminder:
  data.reminder } : task
  )
  )
}

  return (
    <Router>
      <div className="container">
      <Header onAdd={() => setShowAddTask
      (!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder} /> : (
        'No Task to Show')}
        {/* <Route path='/about' component={About} /> */}
        <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
