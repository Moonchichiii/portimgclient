import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchCurrentUser } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import styles from './auth.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then(() => {
      dispatch(fetchCurrentUser());
    });
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className={styles['form-container']}>
      <h2>Login</h2>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className={styles['error-message']}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
