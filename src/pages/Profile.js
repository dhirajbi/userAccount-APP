// Show user profile. Allows editing name/email.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Profile() {
  // Global user state from context
  const { user, updateUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // When user changes: reset form, or redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
    else setForm({ name: user.name, email: user.email });
  }, [user, navigate]);

  if (!user) return null; // Don't render until user loaded

  // Handle profile save (update name/email)
  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.email) {
      setError('Both name and email are required');
      return;
    }
    try {
      updateUser(user.id, form.name, form.email);
      setSuccess('Profile updated!');
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="col-md-4 mx-auto">
      <h3>Profile</h3>
      <div className="card p-3 shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {editMode ? (
          <form onSubmit={handleSave}>
            <div className="mb-2">
              {/* Editable name field */}
              <label>Name:</label>
              <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-2">
              {/* Editable email field */}
              <label>Email:</label>
              <input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Save</button>
            <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => { setEditMode(false); setError(''); setSuccess(''); setForm({ name: user.name, email: user.email }); }}>Cancel</button>
          </form>
        ) : (
          <>
            {/* Profile display, with Edit and Logout buttons */}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => setEditMode(true)}>Edit</button>
            <button
              className="btn btn-secondary mt-3 ms-2"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
