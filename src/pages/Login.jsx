import { useState } from 'react';
import { login } from '../services/authService';
import useAuthStore from '../store/AuthStore/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      loginUser(data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to OrbitBoi</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}