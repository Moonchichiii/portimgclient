import React, { Suspense } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import styles from './Home.module.css';
import Loader from '../../components/common/Loader';

const AboutPage = React.lazy(() => import('../about/About'));
const BlogPage = React.lazy(() => import('../blog/Blog'));
const PortfolioPage = React.lazy(() => import('../portfolio/Portfolio'));

const HomePage = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.animatedText}>Portfolio Blog</h1>
          <p className={styles.subtitle}>Explore my projects and blog posts</p>
          <ScrollLink to="about" smooth={true} duration={500} className="button">
            Get Started
          </ScrollLink>
        </div>
      </section>
      
      <Suspense fallback={<Loader />}>
        <Element name="about" className={styles.section} id="about">
          <AboutPage />
        </Element>
        <Element name="blog" className={styles.section} id="blog">
          <BlogPage />
        </Element>
        <Element name="portfolio" className={styles.section} id="portfolio">
          <PortfolioPage />
        </Element>
      </Suspense>
    </div>
  );
};

export default HomePage;
