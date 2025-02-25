"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  color: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskList({ task }: Readonly<TaskCardProps>) {
  const [checked, setChecked] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useRouter();

  const toggle = (id: string) => async () => {
    const taskData = {
      id: id,
      completed: !task.completed,
    };
    console.log("Task data:", taskData);
    setChecked(!checked);
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task updated:", data);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => {
    navigate.push(`/update/${task.id}`);
  };

  const handleDelete = async () => {
    setIsConfirming(true);

    let confirmed = false;

    if (isConfirming) {
      confirmed = window.confirm("Are you sure you want to delete this task?");
    } else {
      return;
    }

    if (confirmed) {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task.id }),
      });
      if (response.ok) {
        setIsConfirming(false);
        console.log("Task deleted:", task.id);
      }
    }
  };

  const color = task.completed ? "gray-500" : task.color;

  return (
    <div className="p-4 mt-2 mb-2 rounded-lg shadow-md bg-gray-800">
      <div className="flex items-center justify-start gap-4 w-full">
        <label className="inline-flex items-center space-x-2">
          <input
            checked={checked}
            onChange={toggle(task.id)}
            type="checkbox"
            name={task.name}
            className={`h-6 w-6 border-2 rounded-md border-${color} focus:ring-${color} focus:ring-2`}
          />
          <h3 className="text-xl font-semibold text-white-800">{task.name}</h3>
        </label>

        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
