import {useState, useEffect} from "react";
import './App.css';
import TaskForm from './TaskForm';
import Task from "./Task";
function App() {

  // creates state variables
  const [tasks, setTasks] = useState([]);
  
  // everytime [tasks] changes, it adds to local storage
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // on load, gets [tasks] from local storage, sets from [] to [tasks] 
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || [])
  }, []);

  // appends new task [name, done] to [tasks]
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name, done:false}];
    })
  };
  
  function removeTask(taskIndex) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => {
        return index !== taskIndex;
      });
    })
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev]; 
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const totalTasks = tasks.length;

  function getMessage() {
    const percentage = numberComplete/totalTasks * 100;
    if (percentage === 0) {
      return "Let's get started! 😀";
    }
    if (percentage === 100) {
      return "Nice job! You can rest now! 💤";
    } 
    return 'Keep it going! 💪'
  };
  function renameTask(index, newName) {
    setTasks(prev =>{
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <h1>{numberComplete}/{totalTasks} Complete</h1>
      <h2>{getMessage()}</h2>
      <div className="taskwrap">

      <TaskForm onAdd={addTask}/>
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renameTask(index, newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
      </div>
    </main>
  );
}

export default App;
