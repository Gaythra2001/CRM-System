import React, { useContext, useEffect, useState } from "react";
import TicketForm from "../Ticket/TicketForm";
import TicketList from "../Ticket/TicketList";
import { fetchTickets, updateTicketStatus, deleteTicket } from "../../service/ticketsAPI";
import { fetchCustomers } from "../../service/customersAPI";
import { fetchLeads, updateLeadStatus, convertLead } from "../../service/leadsAPI";
import { fetchTasks, updateTaskStatus, deleteTask } from "../../service/tasksAPI";
import CustomerForm from "../Customer/CustomerForm";
import CustomerList from "../Customer/CustomerList";
import LeadForm from "../Lead/LeadForm";
import LeadList from "../Lead/LeadList";
import TaskForm from "../Task/TaskForm";
import TaskList from "../Task/TaskList";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PlannerDashboard = () => {
  const { token, userId , role} = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token && userId) {
      getTickets();
      loadCustomers();
      loadLeads();
      loadTasks();
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

  const loadCustomers = async () => {
    try {
      const res = await fetchCustomers(token);
      setCustomers(res);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await fetchLeads(token);
      setLeads(res);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const loadTasks = async () => {
    try {
      const res = await fetchTasks(token);
      setTasks(res);
    } catch (error) {
      console.error("Error fetching tasks:", error);
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

  const handleLeadStatusChange = async (leadId, status) => {
    try {
      await updateLeadStatus(token, leadId, status);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
      toast.success("Lead status updated");
    } catch (err) {
      toast.error("Failed to update lead");
    }
  };

  const handleLeadConvert = async (leadId) => {
    try {
      await convertLead(token, leadId);
      toast.success("Lead converted to customer");
      loadLeads();
      loadCustomers();
    } catch (err) {
      toast.error("Failed to convert lead");
    }
  };

  const handleTaskStatus = async (taskId, status) => {
    try {
      await updateTaskStatus(token, taskId, status);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      toast.error("Failed to delete task");
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

      {/* Customers */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Customer</h2>
          </div>
          <CustomerForm onCreated={loadCustomers} />
        </div>
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Customers</h2>
          </div>
          <CustomerList customers={customers} />
        </div>
      </div>

      {/* Leads */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">New Lead</h2>
          <LeadForm onCreated={loadLeads} />
        </div>
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leads</h2>
          </div>
          <LeadList leads={leads} onChangeStatus={handleLeadStatusChange} onConvert={handleLeadConvert} />
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">New Task</h2>
          <TaskForm onCreated={loadTasks} />
        </div>
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Tasks</h2>
          </div>
          <TaskList tasks={tasks} onStatusChange={handleTaskStatus} onDelete={handleTaskDelete} />
        </div>
      </div>
    </div>
  );
};

export default PlannerDashboard;
