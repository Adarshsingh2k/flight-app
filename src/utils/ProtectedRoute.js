import { useContext } from "react";
import UserContext from "../state/UserContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};
