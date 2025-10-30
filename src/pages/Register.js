// Register page component: allows new users to create an account
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Register() {
  // State for form fields
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  // State for error message
  const [error, setError] = useState('');
  // React Router hook for navigation after registration
  const navigate = useNavigate();
  // Auth context
  const { register } = useAuth();

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault(); // Prevent browser reload
    try {
      // Validate all fields filled
      if (!form.name || !form.email || !form.password) {
        setError('All fields are required');
        return;
      }
      // Attempt registration via AuthContext
      register(form.name, form.email, form.password);
      // On success, navigate to profile
      navigate('/profile');
    } catch (err) {
      // Show registration errors (e.g., email exists)
      setError(err.message);
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3>Register</h3>
      {/* Error message display */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <input
          className="form-control my-2"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="btn btn-primary w-100 mt-2">Register</button>
      </form>
    </div>
  );
}
