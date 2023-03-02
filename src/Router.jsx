import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "./CurrentUserContext";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";

export default function Router({ inputText }) {

  function ProtectedRoute({ children, redirectPath = "/" }) {
    const { currentUser } = useCurrentUser();

    if (!currentUser) {
      return <Navigate to={redirectPath} />;
    }

    return children;
  }

  return (
    <Routes>
      <Route index element={<HomePage inputText={inputText} />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}