import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { scroller } from 'react-scroll';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const handleScrollLink = (to) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo(to, {
          smooth: true,
          duration: 500,
        });
      }, 100);
    } else {
      scroller.scrollTo(to, {
        smooth: true,
        duration: 500,
      });
    }
    handleClose();
  };

  const NavLinks = () => (
    <>
      <Link className={styles.link} to="/" onClick={handleClose} tabIndex="0" aria-label="Home">Home</Link>
      <span className={styles.link} onClick={() => handleScrollLink('about')} tabIndex="0" aria-label="About">About</span>
      <span className={styles.link} onClick={() => handleScrollLink('blog')} tabIndex="0" aria-label="Blog">Blog</span>
      <span className={styles.link} onClick={() => handleScrollLink('portfolio')} tabIndex="0" aria-label="Portfolio">Portfolio</span>
      {user ? (
        <>
          <Link className={styles.link} to="/dashboard" onClick={handleClose} tabIndex="0" aria-label="Dashboard">Dashboard</Link>
          <button className={styles.button} onClick={handleLogout} tabIndex="0" aria-label="Logout">Logout</button>
        </>
      ) : (
        <>
          <button className={styles.button} onClick={() => handleNavigate('/login')} tabIndex="0" aria-label="Sign in">Sign in</button>
          <button className={styles.button} onClick={() => handleNavigate('/register')} tabIndex="0" aria-label="Sign up">Sign up</button>
        </>
      )}
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles.menuButton} onClick={handleToggle} role="button" tabIndex="0" aria-label="Toggle menu" aria-expanded={show}>
        <div className={`${styles.bars} ${show ? styles.open : ''}`}></div>
        <div className={`${styles.bars} ${show ? styles.open : ''}`}></div>
        <div className={`${styles.bars} ${show ? styles.open : ''}`}></div>
      </div>
      <nav className={styles.desktopNav}>
        <NavLinks />
      </nav>
      <div className={`${styles.offcanvas} ${show ? styles.show : ''}`} aria-hidden={!show}>
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
