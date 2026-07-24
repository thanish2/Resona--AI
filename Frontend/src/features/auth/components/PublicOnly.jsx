import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PublicOnly = ({ children }) => {
  const { user } = useAuth();


  if (user) {
    return <Navigate to="/" replace />; // already logged in, don't show login page
  }

  return children;
};

export default PublicOnly;