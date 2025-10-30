// Main application component - controls routes and navigation setup
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider } from './components/AuthContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Always show Navbar at the top */}
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Redirect root to login for a simple entry point */}
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Map to Login, Register, and Profile pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Profile is now publicly accessible—protection moved to Profile page */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
  