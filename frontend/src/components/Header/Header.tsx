import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Apply to html as well
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // Reset html as well
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // Reset html as well
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleMobileMenu();
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Quiz Qrafter
        </Link>
      </h1>

      {/* Mobile Menu Icon */}
      <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        ☰
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <h1 className={styles.logoMobile}>
              <Link
                to="/"
                className={styles.logoLink}
                onClick={handleLogoClick}
              >
                Quiz Qrafter
              </Link>
            </h1>
            <button className={styles.closeButton} onClick={toggleMobileMenu}>
              ×
            </button>
          </div>
          <nav className={styles.mobileNav}>
            <Link
              to="/"
              className={styles.mobileMenuItem}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={styles.mobileMenuItem}
              onClick={toggleMobileMenu}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={styles.mobileMenuItem}
              onClick={toggleMobileMenu}
            >
              Sign up
            </Link>
            {/* Add other navigation links as needed */}
          </nav>
        </div>
      )}

      {/* Desktop Menu */}
      <nav className={styles.desktopMenu}>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/login" className={styles.navItem}>
          Log in
        </Link>
        <Link to="/signup" className={styles.navItem}>
          Sign up
        </Link>
        {/* Add other navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;
