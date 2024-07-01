import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, fetchCurrentUser } from '../store/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Auth.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password })).then(() => {
      dispatch(fetchCurrentUser());
    });
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.customForm}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className={`${styles.button} btn btn-primary mt-3`} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
      <div className={styles.switchForm}>
        <p>Already have an account? <Link to="/login">Sign in here!</Link></p>
      </div>
    </div>
  );
};

export default Register;
