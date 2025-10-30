// Navbar component: navigation bar for the app
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Navbar() {
  // Get user and logout from context
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Main app brand link */}
      <Link to="/" className="navbar-brand">AccountApp</Link>
      <div className="ms-auto">
        {/* If user is logged in, show Profile and Logout buttons */}
        {user ? (
          <>
            <Link to="/profile" className="btn btn-sm btn-outline-light mx-1">
              Profile
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="btn btn-sm btn-outline-light mx-1"
            >
              Logout
            </button>
          </>
        ) : (
          // If user NOT logged in, show Login and Register
          <>
            <Link to="/login" className="btn btn-sm btn-outline-light mx-1">Login</Link>
            <Link to="/register" className="btn btn-sm btn-outline-light mx-1">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
