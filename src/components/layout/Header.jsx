import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link className={styles.brandLink} to="/">Portfolio Blog</Link>
      </div>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/blog">Blog</Link>
        <Link className={styles.link} to="/portfolio">Portfolio</Link>
        {user ? (
          <>
            <Link className={styles.link} to="/dashboard">Dashboard</Link>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className={styles.button} onClick={() => handleNavigate('/login')}>Sign in</button>
            <button className={styles.button} onClick={() => handleNavigate('/register')}>Sign up</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;


