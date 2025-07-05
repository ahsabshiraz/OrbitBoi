import React from 'react';
import useAuthStore from '../../store/AuthStore/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#0F0F0F] border-b border-[#262626] sticky top-0 z-50 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">OB</span>
          </div>
          <h1 className="text-xl font-bold text-white">OrbitBoi</h1>
        </div>
  
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search models..."
              className="pl-10 pr-4 py-2 bg-[#1A1A1A] text-gray-300 border border-[#2a2a2a] rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
  
          <button className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-[#1A1A1A] rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
          </button>
  
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/5 text-red-400 border border-red-500/20 rounded-md shadow-sm hover:bg-red-500/10 hover:text-red-300 hover:shadow-lg transition-all duration-300 backdrop-blur-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
  
  );
};

export default Header;
