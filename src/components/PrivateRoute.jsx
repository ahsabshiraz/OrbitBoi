import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore/useAuthStore';

export default function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
}