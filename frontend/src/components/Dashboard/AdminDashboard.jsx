import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserList from "../user/UserList";
import StatsCard from "../StatsCard";
import { fetchUsers } from "../../service/userAPI";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: 0, tickets: 0 });

  const fetchStats = async () => {
    try {
      // Fetch users 
      const usersRes = await fetchUsers(token);
      setUsers(usersRes);
  
      // Update stats AFTER setting state
      setStats({ users: usersRes.length });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  

  useEffect(() => {
    setStats({ users: users.length});
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatsCard title="Total Users" value={stats.users} />
        {/* <StatsCard title="Total Tickets" value={stats.tickets} /> */}
      </div>

      {/* Users */}
      <UserList users={users} />
    </div>
  );
};

export default AdminDashboard;