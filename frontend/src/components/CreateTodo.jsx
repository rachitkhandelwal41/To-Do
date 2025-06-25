import { useState } from "react";
import React from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    fetch(`${BASE_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-type": "application/json" }
    })
      .then(async (res) => {
        await res.json();
        alert("Todo added");
        setTitle("");
        setDescription("");
        onTodoCreated();
      })
      .catch((err) => console.error("Failed to add todo:", err));
  };

  return (
    <div className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleAddTodo}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Add Todo
      </button>
    </div>
  );
}
