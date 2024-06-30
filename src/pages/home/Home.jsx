import React from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.shape + ' ' + styles.circle}></div>
          <div className={styles.shape + ' ' + styles.square}></div>
          <div className={styles.shape + ' ' + styles.triangle}></div>
        </div>
        <div className={styles.container}>
          <h1 className={styles.animatedText}>Welcome to My Folio</h1>
          <p className={styles.subtitle}>Explore my projects and blog posts</p>
          <button className={styles.ctaButton}>View Projects</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
