import React, { useState } from 'react';
import '../../styles/AdminLogin.css';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
    // Add authentication logic here
    navigate("/admin/dashboard/home")
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2 className="admin-login-title">🔐 Admin Panel</h2>
        <p className="admin-login-subtitle">Secure access for authorized users</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <span className="input-icon">
              {/* Email SVG */}
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 13.065L.8 4h22.4L12 13.065zm0 2.335l-12-9.4V20h24V6l-12 9.4z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <span className="input-icon">
              {/* Lock SVG */}
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8h-1V6c0-2.76-2.24-5-5-5S6 3.24 6 6v2H5c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.11-.9-2-2-2zM8 6c0-1.65 1.35-3 3-3s3 1.35 3 3v2H8V6zm9 16H5V10h12v12z" />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="admin-login-button">Login</button>
        </form>

        <p className="admin-login-footer">© 2025 ReasEstatePro
            Admin</p>
      </div>
    </div>
  );
};

export default AdminLogin;
