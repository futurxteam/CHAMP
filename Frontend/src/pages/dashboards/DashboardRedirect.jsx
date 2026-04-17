import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../store/useStore";

export default function DashboardRedirect() {
  const { isAuthenticated, user } = useStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (user?.role === "speaker") return <Navigate to="/dashboard/speaker" replace />;
  if (user?.role === "user") return <Navigate to="/dashboard/user" replace />;

  return <Navigate to="/" replace />;
}
