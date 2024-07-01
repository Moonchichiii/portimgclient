import React from 'react';
import styles from '../Page.module.css';

const PortfolioPage = () => {
  const projects = [
    {
      title: 'Project One',
      description: 'This is a description of the first project. It highlights the main features and technologies used.',
      technologies: ['React', 'Redux', 'Node.js'],
      liveDemo: 'https://live-demo-link.com',
      github: 'https://github.com/yourusername/project-one'
    },
    {
      title: 'Project Two',
      description: 'This is a description of the second project. It highlights the main features and technologies used.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveDemo: 'https://live-demo-link.com',
      github: 'https://github.com/yourusername/project-two'
    },
    {
      title: 'Project Three',
      description: 'This is a description of the third project. It highlights the main features and technologies used.',
      technologies: ['Python', 'Django', 'PostgreSQL'],
      liveDemo: 'https://live-demo-link.com',
      github: 'https://github.com/yourusername/project-three'
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <h1>Portfolio</h1>
      <p>Welcome to my portfolio page. Here are some of the projects I've worked on:</p>
      
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <div key={index} className={styles.project}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Technologies used:</strong> {project.technologies.join(', ')}</p>
            <p>
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a> | 
              <a href={project.github} target="_blank" rel="noopener noreferrer"> GitHub</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
