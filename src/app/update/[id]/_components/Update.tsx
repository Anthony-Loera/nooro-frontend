import UpdateForm from "./UpdateForm";

interface Props {
  id: string;
}

interface Task {
  id: string;
  name: string;
  color: string;
  completed: boolean;
}

export default async function Update({ id }: Readonly<Props>) {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    return;
  }

  console.log(response.status);
  const task: Task = await response.json();

  return (
    <div className="flex flex-col items-center min-h-screen p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white-800">Update Task</h1>
      <UpdateForm task={task} />
    </div>
  );
}
