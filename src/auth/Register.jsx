import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, fetchCurrentUser } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import styles from './auth.module.css';

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
    <div className={styles['form-container']}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className={styles['error-message']}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
