import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // fetch tasks once
  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.taskId !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>
      <TaskForm onTaskAdded={addTask} />
      <TaskList tasks={tasks} onTaskDeleted={deleteTask} />
    </div>
  );
}

export default App;
