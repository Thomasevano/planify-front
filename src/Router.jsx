import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "./CurrentUserContext";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";

export default function Router({ inputText }) {
  const { currentUser } = useCurrentUser();
  
  function ProtectedRoute({ children, redirectPath = "/", isAllowed }) {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  }

  return (
    <Routes>
      <Route index element={<HomePage inputText={inputText} />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute
            isAllowed={!!currentUser}
          >
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute
            isAllowed={!!currentUser && currentUser.role === "retailer"}
          >
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}