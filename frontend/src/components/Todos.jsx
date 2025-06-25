const BASE_URL = import.meta.env.VITE_BASE_URL;

export function Todos({ todos }) {
  const markAsComplete = async (id) => {
    await fetch(`${BASE_URL}/completed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    window.location.reload(); 
  };

  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos yet.</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600">{todo.description}</p>
            <button
              className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
                todo.completed
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
              onClick={() => markAsComplete(todo._id)}
              disabled={todo.completed}
            >
              {todo.completed ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
