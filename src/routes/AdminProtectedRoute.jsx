import { Navigate } from "react-router-dom";
import { getAdminSession } from "../utils/adminAuth";

export default function AdminProtectedRoute({ children }) {
  return getAdminSession() ? children : <Navigate to="/admin-login" replace />;
}
