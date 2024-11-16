import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useStore();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask({ ...task, completed: !task.completed })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <div>
              <h3 className="text-lg font-medium">{task.title}</h3>
              {task.description && (
                <p className="text-gray-500 dark:text-gray-400">
                  {task.description}
                </p>
              )}
              {task.dueDate && (
                <p className="text-sm text-gray-400">
                  Due: {format(task.dueDate, 'PPP')}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};