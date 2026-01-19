import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TicketUpdateForm from "./TicketUpdateForm";
import { fetchUserById } from "../../service/userAPI";

const TicketList = ({
  tickets,
  updateTicketStatusInList,
  deleteTicketInList,
}) => {
  const { token, userId } = useContext(AuthContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditing(true);
  };

  const openStatusModal = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
  };

  const closeModals = () => {
    setSelectedTicket(null);
    setNewStatus("");
    setIsEditing(false);
  };

  const handleUpdateStatus = () => {
    if (selectedTicket && newStatus) {
      updateTicketStatusInList(selectedTicket.id, newStatus);
      closeModals();
    }
  };
  const handleTicketUpdateSuccess = () => {
    closeModals();
  };

  const handleDelete = (id) => {
    deleteTicketInList(id);
  };

  // const getName = (id) => {
  //   try {
  //     const res = fetchUserById(token, id);
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  if (!tickets) {
    return <p className="text-gray-600 text-center">Loading...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tickets</h2>
      {tickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.serial_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.client_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${ticket.amount}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "open"
                          ? "bg-yellow-100 text-yellow-700"
                          : ticket.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-1">
                    {ticket.assigned_to === userId ? (
                      <>
                        <span className="text-green-600 font-semibold">
                          Assigned to me
                        </span>
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </>
                    ) : (
                      ticket.assigned_to
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.created_by === userId ? "Me" : ticket.created_by}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md"
                      onClick={() => openStatusModal(ticket)}
                    >
                      Update
                    </button>
                    {ticket.created_by === userId && (
                      <>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
                          onClick={() => openEditModal(ticket)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
                          onClick={() => handleDelete(ticket.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-6">No tickets found.</p>
      )}

      {selectedTicket && isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/30">
          <div className="bg-white p-8 rounded-2xl w-full max-w-3xl mx-4 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div></div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <TicketUpdateForm
              ticket={selectedTicket}
              onUpdateSuccess={handleTicketUpdateSuccess}
            />
          </div>
        </div>
      )}

      {selectedTicket && !isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Ticket Status</h3>
            <p className="mb-2">
              Updating status for Ticket:{" "}
              <strong>{selectedTicket.serial_number}</strong>
            </p>
            <select
              className="w-full p-2 border rounded-lg"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeModals}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
