import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Creator from './pages/Creator';
import Viewer from './pages/Viewer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="/creator/:id" 
          element={
            <PrivateRoute>
              <Creator />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/viewer/:experienceId" 
          element={
            <PrivateRoute>
              <Viewer />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}