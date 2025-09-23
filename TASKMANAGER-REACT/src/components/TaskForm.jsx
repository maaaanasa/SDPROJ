import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2030/api/tasks", task)
      .then((res) => {
        // res.data must be the created task with ID
        if (res.data) {
          onTaskAdded(res.data);
        }
        setTask({ title: "", description: "", status: "", assignedTo: "", dueDate: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create Task</h2>
      <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={task.description} onChange={handleChange} placeholder="Description" required />
      <input name="status" value={task.status} onChange={handleChange} placeholder="Status" required />
      <input name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Assigned To" required />
      <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
