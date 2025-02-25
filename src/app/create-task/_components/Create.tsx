import CreateForm from "./CreateForm";

export default function Create() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 space-y-6">
      <h1 className="text-4xl font-bold text-white-800">Create Task</h1>
      <CreateForm />
    </div>
  );
}
