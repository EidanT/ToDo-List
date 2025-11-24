import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const getInitialTasks = (): Task[] => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    try {
      const parsed: Task[] = JSON.parse(saved);
      return parsed;
    } catch (error) {
      console.error("Error al parsear las tareas guardadas:", error);
      return [];
    }
  }
  return [];
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : tasks;

  return (
    <div className="app">
      <h1>To Do List</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una tarea..."
      />
      <button onClick={addTask}>Añadir</button>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "all" | "completed")
        }
      >
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
      </select>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}