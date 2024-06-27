import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
