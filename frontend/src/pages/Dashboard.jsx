import { useEffect, useState } from "react";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://task-tracker-1wen.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await fetch("https://task-tracker-1wen.onrender.com/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`https://task-tracker-1wen.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ completed }),
      });
      const data = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://task-tracker-1wen.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Dashboard</h2>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Task Form */}
        <TaskForm addTask={addTask} />

        {/* Task List */}
        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet</p>
          ) : (
            <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
          )}
        </div>
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({ title, priority, dueDate });
    setTitle("");
    setPriority("low");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}

function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`flex items-center justify-between p-4 border rounded shadow-sm ${
            task.completed ? "bg-green-50" : "bg-gray-50"
          }`}
        >
          <div>
            <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
            <p className="text-sm text-gray-600">
              Priority:{" "}
              <span
                className={`font-bold ${
                  task.priority === "high"
                    ? "text-red-600"
                    : task.priority === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {task.priority}
              </span>
            </p>
            {task.dueDate && (
              <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleTask(task._id, !task.completed)}
              className={`px-3 py-1 rounded ${
                task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
