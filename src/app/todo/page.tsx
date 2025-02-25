import TaskCard from "./_components/TaskCard";

interface Tasks {
  id: string;
  name: string;
  color: string;
  completed: boolean;
}

export default async function Home() {
  const tasks: Tasks[] = await fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      return [];
    });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-blue-500 text-5xl font-extrabold flex items-center justify-center">
        Todo App
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <TaskCard tasks={tasks} />
      </main>
    </div>
  );
}
