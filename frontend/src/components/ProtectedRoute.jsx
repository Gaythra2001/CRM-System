import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!token || !allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  
  return children;
};

export default ProtectedRoute;
