import { useState } from "react";

interface Task {
  id: number;
  text: string;
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
      setTasks([...tasks, { id: Date.now(), text }]);
    }

    setText("");
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-4">
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

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="p-3 bg-gray-200 rounded-xl border border-gray-300 flex justify-between items-center gap-2"
            >
              <span>{t.text}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setText(t.text);
                    setEditId(t.id);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

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

      </div>
    </div>
  );
}
