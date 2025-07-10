import { useState } from 'react';
import { register } from '../services/authService';
import useAuthStore from '../store/AuthStore/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await register({ name, email, password });
      loginUser(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      <div className="bg-[#18181b] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#23232a]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-2xl">OB</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Create your OrbitBoi account</h2>
          <p className="text-zinc-400 text-sm">Sign up to get started!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-zinc-300 mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-[#23232a] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-zinc-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#23232a] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-zinc-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[#23232a] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-600 transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-zinc-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}