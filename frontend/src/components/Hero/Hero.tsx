import React from "react";
import { Link } from "react-router-dom";
import styles from "./hero.module.css"; // Import the CSS module
import hImage from "../../assets/heroPic.png";
import image2 from "../../assets/heroExtra.png";

const Hero = () => {
  return (
    <>
    <div className={styles.hero}>
      <div className={styles.content}>
      <h1 className={styles.heroHeading}>Best online platform for learning</h1>
      <p className={styles.heroSubheading}>
        Your personal AI tutor
      </p>
      <Link to="/signup" className={styles.joinButton}>
        Get Started
      </Link>
      </div>
      <div className={styles.imageContainer}>
        <img src={hImage} alt="Hero Image" className={styles.heroImage}/>
      </div>
    </div>
    </>
  );
};

export default Hero;
