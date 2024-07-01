import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const NavLinks = () => (
    <>
      <Link className={styles.link} to="/" onClick={handleClose}>Home</Link>
      <Link className={styles.link} to="/about" onClick={handleClose}>About</Link>
      <Link className={styles.link} to="/blog" onClick={handleClose}>Blog</Link>
      <Link className={styles.link} to="/portfolio" onClick={handleClose}>Portfolio</Link>
      {user ? (
        <>
          <Link className={styles.link} to="/dashboard" onClick={handleClose}>Dashboard</Link>
          <button className={styles.button} onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button className={styles.button} onClick={() => handleNavigate('/login')}>Sign in</button>
          <button className={styles.button} onClick={() => handleNavigate('/register')}>Sign up</button>
        </>
      )}
    </>
  );

  return (
    <header className={styles.header}>
      <Button variant="primary" className={styles.menuButton} onClick={handleShow}>
        <div className={`${styles.hamburger} ${show ? styles.open : ''}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Button>
      <nav className={styles.desktopNav}>
        <NavLinks />
      </nav>
      <div className={`${styles.offcanvas} ${show ? styles.show : ''}`}>
        <div className={styles.offcanvasHeader}>
          <button className={styles.closeButton} onClick={handleClose}>×</button>
          <h5>Menu</h5>
        </div>
        <div className={styles.offcanvasBody}>
          <nav className={styles.mobileNav}>
            <NavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
