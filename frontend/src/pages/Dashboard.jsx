import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import PlannerDashboard from "../components/Dashboard/PlannerDashboard";


const Dashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 w-full">
      {role === "admin" && <AdminDashboard />}
      {role === "financial_planner" && <PlannerDashboard />}
      {role === "mortgage_broker" && <PlannerDashboard />}
    </div>
  );
};

export default Dashboard;