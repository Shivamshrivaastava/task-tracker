import React from "react";

function TaskList({ tasks, updateTask, deleteTask }) {
  if (!tasks.length) return <p className="text-center mt-6">No tasks yet.</p>;

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center justify-between bg-white p-3 rounded shadow"
        >
          <div
            onClick={() => updateTask(task._id, { completed: !task.completed })}
            className={`flex-1 cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </div>
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
