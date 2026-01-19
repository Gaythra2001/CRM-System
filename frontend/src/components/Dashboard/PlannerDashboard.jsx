import React, { useContext, useEffect, useState } from "react";
import TicketForm from "../Ticket/TicketForm";
import TicketList from "../Ticket/TicketList";
import { fetchTickets, updateTicketStatus, deleteTicket } from "../../service/ticketsAPI";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PlannerDashboard = () => {
  const { token, userId , role} = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (token && userId) {
      getTickets();
    }
  }, [token, userId, toggle]);

  const getTickets = async () => {
    try {
      const res = await fetchTickets(token);
      if (!Array.isArray(res)) {
        console.error("Invalid ticket data:", res);
        return;
      }

      const filteredTickets = res.filter(
        (ticket) => ticket.assigned_to === userId || ticket.created_by === userId
      );

      setTickets(filteredTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Update ticket 
  const handleUpdateTicketStatus = async (ticketId, newStatus) => {
    try {
      await updateTicketStatus(token, ticketId, newStatus);
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
      toast.success("Ticket status updated successfully");
    } catch (error) {
      toast.error("Failed to update ticket status");
    }
  };

  // Delete ticket 
  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(token, ticketId);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );
      toast.success("Ticket deleted successfully");
    } catch (error) {
      toast.error("Failed to delete ticket");
    }
  };

  return (
    <div className="container mx-auto max-w-full p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {role == "financial_planner" ?(<>Finance Planner</>):(<>Mortgage Broker</>)} Dashboard
      </h1>

      <div className="flex justify-between items-center mb-8">
        <div></div>
        <button
          onClick={() => setToggle(!toggle)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm"
        >
          Add New Ticket
        </button>
      </div>

      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-4 border border-gray-100 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create Ticket</h2>
              <button
                onClick={() => setToggle(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <TicketForm />
          </div>
        </div>
      )}

      {/* Submitted Tickets */}
      <div className="p-6 rounded-2xl shadow-lg border border-gray-200 max-w-full ">
        <TicketList 
          tickets={tickets} 
          updateTicketStatusInList={handleUpdateTicketStatus} 
          deleteTicketInList={handleDeleteTicket}
        />
      </div>
    </div>
  );
};

export default PlannerDashboard;
