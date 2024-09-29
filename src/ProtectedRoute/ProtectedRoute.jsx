import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, login }) {
  return login ?children: <Navigate to="/" />; // Redirect to login if not authenticated
}

export default ProtectedRoute