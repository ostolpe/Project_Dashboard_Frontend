import React from "react";
import { useAuth } from "../contexts";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../partials/components/LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) return <LoadingSpinner />;
  return auth.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};

export const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) return <LoadingSpinner />;
  return auth.isAuthenticated && auth.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin/projects" replace />
  );
};
