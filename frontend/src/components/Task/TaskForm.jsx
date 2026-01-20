import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchUsers } from "../../service/userAPI";
import { saveTask } from "../../service/tasksAPI";
import { toast } from "react-toastify";

const TaskForm = ({ onCreated }) => {
  const { token, userId } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    relatedType: "",
    relatedId: "",
    assignedTo: "",
    reminderAt: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers(token);
        setUsers(res.filter((u) => u.role !== "admin"));
      } catch (e) {
        console.error(e);
      }
    };
    loadUsers();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, assignedTo: form.assignedTo || userId };
      await saveTask(token, payload);
      toast.success("Task created");
      setForm({ title: "", description: "", dueDate: "", relatedType: "", relatedId: "", assignedTo: "", reminderAt: "" });
      onCreated?.();
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="border p-2 rounded w-full" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input type="datetime-local" name="dueDate" value={form.dueDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="datetime-local" name="reminderAt" value={form.reminderAt} onChange={handleChange} className="border p-2 rounded" />
        <select name="relatedType" value={form.relatedType} onChange={handleChange} className="border p-2 rounded">
          <option value="">Link to (optional)</option>
          <option value="lead">Lead</option>
          <option value="customer">Customer</option>
          <option value="deal">Deal</option>
          <option value="ticket">Ticket</option>
        </select>
        <input name="relatedId" value={form.relatedId} onChange={handleChange} placeholder="Related ID" className="border p-2 rounded" />
        <select name="assignedTo" value={form.assignedTo} onChange={handleChange} className="border p-2 rounded">
          <option value="">Assign to (optional)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{`${u.username} (${u.role})`}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Task</button>
    </form>
  );
};

export default TaskForm;
