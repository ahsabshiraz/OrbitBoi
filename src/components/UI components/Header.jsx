import useAuthStore from "../../store/AuthStore/useAuthStore";
import { useNavigate } from 'react-router-dom';
export default function Header() {

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <header className="w-full bg-gray-100 shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">🔧 3D Model Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{`Welcome ${user.name} `}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => { handleLogout ()}}>
                    Logout
                </button>
            </div>
        </header>
    );
}
