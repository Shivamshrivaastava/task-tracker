import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({ title: text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Enter new task"
        className="flex-grow border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
