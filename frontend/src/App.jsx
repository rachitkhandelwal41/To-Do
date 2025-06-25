

import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
const BASE_URL = import.meta.env.VITE_BASE_URL;
function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch(`${BASE_URL}/todos`)
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Todo App</h1>
        <CreateTodo onTodoCreated={fetchTodos} />
        <Todos todos={todos} />
      </div>
    </div>
  );
}

export default App;
