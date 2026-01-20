import React from "react";

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-gray-600">No tasks assigned.</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="border rounded p-3 flex items-center justify-between">
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="text-xs text-gray-600">Due: {task.due_date ? new Date(task.due_date).toLocaleString() : "-"}</p>
            {task.related_type && (
              <p className="text-xs text-gray-500">Linked to {task.related_type} #{task.related_id}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="border p-1 rounded text-sm"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button className="text-red-600 text-xs" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
