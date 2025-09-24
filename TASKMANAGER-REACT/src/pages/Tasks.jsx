import React, { useState, useEffect } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const userId = 1; // TODO: Replace with logged-in user's ID

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:2030/api/tasks/${userId}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await fetch(`http://localhost:2030/api/tasks/add/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });

      setNewTask("");
      fetchTasks(); // refresh tasks list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Tasks</h2>
      <input
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}{" "}
            {task.deadline && (
              <em>(Due: {new Date(task.deadline).toLocaleString()})</em>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
