import CreateButton from "./CreateButton";
import TaskList from "./TaskList";

interface Task {
  id: string;
  name: string;
  color: string;
  completed: boolean;
}

interface TaskCardProps {
  tasks: Task[];
}

export default function TaskCard({ tasks }: Readonly<TaskCardProps>) {
  const completedTasks = tasks.filter((item) => item.completed);

  return (
    <div className="space-y-8">
      <CreateButton />
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-white-800">
                Uncompleted Tasks
              </h3>
              <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full">
                {tasks.length}
              </span>
            </div>
            {tasks.map((task) => (
              <TaskList key={task.id} task={task} />
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-white-800">
                Completed Tasks
              </h3>
              <span className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full">
                {completedTasks.length} of {tasks.length}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-16">
          <span className="text-lg font-semibold text-gray-500">
            Create First Task
          </span>
        </div>
      )}
    </div>
  );
}
