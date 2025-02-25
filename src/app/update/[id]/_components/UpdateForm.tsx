"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  color: string;
  completed: boolean;
}

interface Props {
  task: Task;
}

export default function UpdateForm({ task }: Readonly<Props>) {
  const [taskName, setTaskName] = useState(task.name);
  const [taskColor, setTaskColor] = useState(task.color);
  const navigate = useRouter();

  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      id: task.id,
      name: taskName,
      color: taskColor,
      completed: task.completed,
    };

    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task created:", data);
        navigate.push("/todo");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="space-y-4 p-6">
      <div>
        <label
          htmlFor="task-name"
          className="block text-sm font-medium text-white-700"
        >
          Task
        </label>
        <input
          id="task-name"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter task"
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="task-color"
          className="block text-sm font-medium text-white-700"
        >
          Task Color
        </label>
        <div className="flex gap-4 mt-2">
          {colors.map((color) => (
            <input
              key={color}
              role="button"
              tabIndex={0}
              onClick={() => setTaskColor(color)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setTaskColor(color);
                }
              }}
              className={`w-10 h-10 rounded-full cursor-pointer transition-all ${
                taskColor === color ? "ring-4 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-center"
        >
          Update Task
        </button>
      </div>
    </form>
  );
}
