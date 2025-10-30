// Login page component: allows existing users to sign in
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Login() {
  // State to manage form fields for email and password
  const [form, setForm] = useState({ email: '', password: '' });
  // State for error message display
  const [error, setError] = useState('');
  // React Router hook to programmatically navigate
  const navigate = useNavigate();
  // Auth context
  const { login } = useAuth();

  // Handle the form submission
  const handleSubmit = e => {
    e.preventDefault(); // Prevent default HTML form submit
    try {
      // Ensure both fields are filled
      if (!form.email || !form.password) {
        setError('All fields are required');
        return;
      }
      // Attempt to log in using AuthContext
      login(form.email, form.password);
      // On success, redirect user to profile page
      navigate('/profile');
    } catch (err) {
      // On failure, show error (e.g., invalid credentials)
      setError(err.message);
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3>Login</h3>
      {/* Show error if present */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        {/* Password field */}
        <input
          className="form-control my-2"
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary w-100 mt-2">Login</button>
      </form>
    </div>
  );
}
