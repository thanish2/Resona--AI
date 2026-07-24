import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import React from "react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-900">
        <div className="flex flex-col items-center gap-6">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-surface-700 border-t-primary-400"></div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">Loading...</h2>
            <p className="mt-1 text-sm text-surface-400">
              Please wait a moment.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
