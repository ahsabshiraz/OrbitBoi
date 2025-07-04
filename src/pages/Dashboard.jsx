import useAuthStore from '../store/AuthStore/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {user?.name || 'User'}!</h2>
      <button onClick={handleLogout}>Logout</button>
      <p>OrbitBoi Dashboard (3D features coming soon!)</p>
    </div>
  );
}