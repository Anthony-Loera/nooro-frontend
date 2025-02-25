"use client";

export default function CreateButton() {
  return (
    <div className="flex justify-center mt-6">
      <a
        href="/create-task"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition text-center"
      >
        Create Task
      </a>
    </div>
  );
}
