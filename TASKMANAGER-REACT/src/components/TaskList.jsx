import React from "react";
import axios from "axios";

const TaskList = ({ tasks, onTaskDeleted }) => {

  const deleteTask = (id) => {
    axios.delete(`http://localhost:2030/api/tasks/${id}`)
      .then(() => onTaskDeleted(id))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>All Tasks</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => deleteTask(task.taskId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
