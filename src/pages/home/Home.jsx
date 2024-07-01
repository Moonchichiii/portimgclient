import React from 'react';
import styles from './Home.module.css';


const HomePage = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.animatedText}>Portfolio Blog</h1>
          <p className={styles.subtitle}>Explore my projects and blog posts</p>
          <button className='button'>Get Started</button>
        </div>
      </section>      
    </div>
  );
};

export default HomePage;
