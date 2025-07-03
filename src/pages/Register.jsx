import { useState } from 'react';
import { register } from '../services/authService';
import useAuthStore from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ name, email, password });
      loginUser(data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register for OrbitBoi</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}