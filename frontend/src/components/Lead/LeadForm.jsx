import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchUsers } from "../../service/userAPI";
import { saveLead } from "../../service/leadsAPI";
import { toast } from "react-toastify";

const LeadForm = ({ onCreated }) => {
  const { token, userId } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    value: "",
    notes: "",
    nextActionAt: "",
    ownerId: "",
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
      const payload = { ...form, ownerId: form.ownerId || userId };
      await saveLead(token, payload);
      toast.success("Lead created");
      setForm({ name: "", email: "", phone: "", source: "", value: "", notes: "", nextActionAt: "", ownerId: "" });
      onCreated?.();
    } catch (err) {
      toast.error("Failed to create lead");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Lead name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        <input name="source" value={form.source} onChange={handleChange} placeholder="Source (e.g., Web, Referral)" className="border p-2 rounded" />
        <input name="value" type="number" value={form.value} onChange={handleChange} placeholder="Potential value" className="border p-2 rounded" />
        <input name="nextActionAt" type="datetime-local" value={form.nextActionAt} onChange={handleChange} className="border p-2 rounded" />
        <select name="ownerId" value={form.ownerId} onChange={handleChange} className="border p-2 rounded">
          <option value="">Assign owner (optional)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{`${u.username} (${u.role})`}</option>
          ))}
        </select>
      </div>
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="border p-2 rounded w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Lead</button>
    </form>
  );
};

export default LeadForm;
