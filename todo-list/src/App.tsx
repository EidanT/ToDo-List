import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(t =>
        t.id === editId ? { ...t, text } : t
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    }

    setText("");
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function toggleComplete(id: number) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

        {/* INPUT */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* ============================
            SECCIÓN 1: TODAS LAS TAREAS
        ============================= */}
        <h2 className="text-xl font-semibold mb-2">Tareas</h2>

        <ul className="space-y-2 mb-6">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No hay tareas aún.</p>
          )}

          {tasks.map((t) => (
            <li
              key={t.id}
              className={`p-3 rounded-xl border flex justify-between items-center gap-2 ${
                t.completed
                  ? "bg-green-200 border-green-400"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              <span
                className={`flex-1 ${
                  t.completed ? "line-through opacity-60" : ""
                }`}
              >
                {t.text}
              </span>

              <div className="flex gap-2">
                {/* COMPLETE */}
                <button
                  onClick={() => toggleComplete(t.id)}
                  className={`px-3 py-1 rounded-lg text-white text-sm transition ${
                    t.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {t.completed ? "Undo" : "Done"}
                </button>

                {/* EDIT */}
                <button
                  onClick={() => {
                    setText(t.text);
                    setEditId(t.id);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteTask(t.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* ============================
            SECCIÓN 2: COMPLETADAS
        ============================= */}
        <h2 className="text-xl font-semibold mb-2">Tareas Completadas</h2>

        <ul className="space-y-2">
          {tasks.filter(t => t.completed).length === 0 && (
            <p className="text-gray-500 text-sm text-center">
              No hay tareas completadas aún.
            </p>
          )}

          {tasks
            .filter((t) => t.completed)
            .map((t) => (
              <li
                key={t.id}
                className="p-3 rounded-xl border bg-green-200 border-green-400 flex justify-between items-center"
              >
                <span className="flex-1 line-through opacity-60">{t.text}</span>

                <button
                  onClick={() => toggleComplete(t.id)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
                >
                  Undo
                </button>
              </li>
            ))}
        </ul>

      </div>
    </div>
  );
}
