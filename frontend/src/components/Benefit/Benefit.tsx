import React from "react";
import { Link } from "react-router-dom";
import styles from "./benefit.module.css"; // Import the CSS module
import benefit from "../../assets/benefits.png";

const Benefit = () => {
  return (
    <>
    <div>
        <h2 className={styles.heading}>Unlock your potential</h2>
        <ul className={styles.subheadingContainer}>
            <li className={styles.subheading}>●  Efficient Learning</li>
            <li className={styles.subheading}>●  Personalized Assessments</li>
            <li className={styles.subheading}>●  Immediate Feedback</li>
        </ul>
        <div className= {styles.buttonContainer}>
        <Link to="/signup" className={styles.joinButton}>
        Register Today
      </Link>
      </div>
      <div className= {styles.imageContainer}>
        <img src={benefit} alt="benefits" className ={styles.benefits} />
        </div>
    </div>
    </>
  );
};

export default Benefit;