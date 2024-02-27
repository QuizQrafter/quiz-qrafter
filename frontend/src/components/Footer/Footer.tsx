// Footer.tsx
import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.about}>
          <h3>About Quiz Qrafter</h3>
          <p>Your go-to platform for interactive quizzes and learning.</p>
        </div>
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          {/* Add more links as needed */}
        </div>
        <div className={styles.socials}>
          <h3>Follow us</h3>
          {/* Insert social media links */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
