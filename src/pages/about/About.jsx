import React from 'react';
import styles from '../Page.module.css';

const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1>About Me</h1>
     
      <section className={styles.section}>
        <h2>Introduction</h2>
        <p>
          Hello! I'm [Your Name], a passionate web developer with a love for creating intuitive and dynamic user experiences. With a background in [Your Field/Background], I specialize in building responsive and user-friendly websites and applications.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Skills</h2>
        <ul className={styles.skillsList}>
          <li>HTML, CSS, JavaScript</li>
          <li>React, Redux</li>
          <li>Node.js, Express</li>
          <li>Python, Django</li>
          <li>SQL, MongoDB</li>
          <li>Git, GitHub</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Experience</h2>
        <p>
          Over the years, I have had the opportunity to work on a variety of projects that have honed my skills in front-end and back-end development. Here are some highlights:
        </p>
        <ul className={styles.experienceList}>
          <li><strong>Web Developer at [Company Name]</strong> - Developed and maintained several client websites, ensuring they were responsive and user-friendly.</li>
          <li><strong>Intern at [Company Name]</strong> - Assisted in developing a web application that streamlined the company's internal processes.</li>
          <li><strong>Freelance Developer</strong> - Worked on multiple freelance projects ranging from small business websites to custom web applications.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Hobbies and Interests</h2>
        <p>
          When I'm not coding, I enjoy [Your Hobbies/Interests], which help me stay creative and balanced. Some of my hobbies include:
        </p>
        <ul className={styles.hobbiesList}>
          <li>Reading about the latest trends in technology</li>
          <li>Playing guitar</li>
          <li>Traveling and exploring new cultures</li>
          <li>Photography</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Contact</h2>
        <p>
          Feel free to <a href="mailto:your.email@example.com">reach out</a> if you'd like to collaborate on a project or just say hello!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
