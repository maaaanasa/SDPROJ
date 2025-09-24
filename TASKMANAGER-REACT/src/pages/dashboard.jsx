import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [lastDeleted, setLastDeleted] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      title: newTask,
      deadline: deadline || null,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setDeadline("");
  };

  const deleteTask = (id) => {
    const deleted = tasks.find((t) => t.id === id);
    setLastDeleted(deleted);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setTasks([...tasks, lastDeleted]);
      setLastDeleted(null);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      tasks.forEach((task) => {
        if (task.deadline) {
          const timeLeft = new Date(task.deadline) - new Date();
          if (timeLeft > 0 && timeLeft < 60000) {
            alert(`⏰ Reminder: Task "${task.title}" is due soon!`);
          }
        }
      });
    }, 30000);

    return () => clearInterval(timer);
  }, [tasks]);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #1e1e1e;
          color: #fff;
        }
        .dashboard-fullscreen {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
        }
        .dashboard-card {
          background: #2b2b2b;
          padding: 25px;
          border-radius: 12px;
          width: 500px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
        }
        h2 {
          margin-bottom: 15px;
          text-align: center;
        }
        .task-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .task-form input[type="text"],
        .task-form input[type="datetime-local"] {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #444;
          background: #333;
          color: white;
        }
        .task-form button {
          padding: 8px 12px;
          background: #4caf50;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }
        .task-list {
          list-style: none;
          padding: 0;
        }
        .task-list li {
          display: flex;
          justify-content: space-between;
          background: #3a3a3a;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .task-list button {
          background: #f44336;
          border: none;
          color: white;
          padding: 5px 8px;
          border-radius: 6px;
          cursor: pointer;
        }
        .undo-btn {
          margin-top: 15px;
          width: 100%;
          background: #2196f3;
          padding: 10px;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }
      `}</style>

      <div className="dashboard-fullscreen">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <div className="task-form">
            <input
              type="text"
              placeholder="Enter new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <span>
                  {task.title}{" "}
                  {task.deadline && (
                    <em>(Due: {new Date(task.deadline).toLocaleString()})</em>
                  )}
                </span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {lastDeleted && (
            <button className="undo-btn" onClick={undoDelete}>
              Undo Last Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
