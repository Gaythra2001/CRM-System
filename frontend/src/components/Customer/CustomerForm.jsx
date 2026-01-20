import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { fetchUsers } from "../../service/userAPI";
import { saveCustomer } from "../../service/customersAPI";
import { toast } from "react-toastify";

const CustomerForm = ({ onCreated }) => {
  const { token, userId } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, ownerId: form.ownerId || userId };
      await saveCustomer(token, payload);
      toast.success("Customer created");
      setForm({ name: "", email: "", phone: "", address: "", ownerId: "" });
      onCreated?.();
    } catch (err) {
      toast.error("Failed to create customer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Customer name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" />
        <select name="ownerId" value={form.ownerId} onChange={handleChange} className="border p-2 rounded">
          <option value="">Assign owner (optional)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{`${u.username} (${u.role})`}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save Customer</button>
    </form>
  );
};

export default CustomerForm;
