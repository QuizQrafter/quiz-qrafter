import React from 'react';
import { Link } from 'react-router-dom';
import styles from './hero.module.css'; // Import the CSS module

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroHeading}>Best online platform for learning</h1>
      <p className={styles.heroSubheading}>There are many variations of passages of Lorem Ipsum available...</p>
      <Link to="/signup" className={styles.joinButton}>Get Started</Link>
    </div>
  );
};

export default Hero;