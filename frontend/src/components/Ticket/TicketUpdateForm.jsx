import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateTicket } from "../../service/ticketsAPI";
import { fetchUsers } from "../../service/userAPI";
import { toast } from "react-toastify";

const TicketUpdateForm = ({ ticket, onUpdateSuccess }) => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    client_name: "",
    client_address: "",
    client_contact: "",
    amount: "",
    assigned_to: "",
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        client_name: ticket.client_name || "",
        client_address: ticket.client_address || "",
        client_contact: ticket.client_contact || "",
        amount: ticket.amount || "",
        assigned_to: ticket.assigned_to || "",
      });
    }
  }, [ticket]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const usersData = await fetchUsers(token);
      const filteredUsers = usersData.filter((user) => user.role !== "admin");
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTicket(token, ticket.id, formData);
      if (res) {
        toast.success("Ticket Updated Successfully");
        onUpdateSuccess();
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Failed to update ticket");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Update Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.client_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Address
            </label>
            <input
              type="text"
              name="clientAddress"
              value={formData.client_address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Contact
            </label>
            <input
              type="text"
              name="clientContact"
              value={formData.client_contact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                min={0}
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                name="assignedTo"
                value={formData.assigned_to}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select User</option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.username} ({user.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketUpdateForm;
