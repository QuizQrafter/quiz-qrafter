import React from 'react';
import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/quiz_qrafter_logo_dark.svg'; // Use a regular image tag for SVGs

const SignUp = () => {
    return (
        <>
            <header className={styles.authHeader}>
                <Link to="/">
                    <img src={Logo} alt="Quiz Qrafter" className={styles.authLogo} />
                </Link>
            </header>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.authTitle}>Get started with Quiz Qrafter</h1>
                    <input type="email" className={styles.authInput} placeholder="Email" />
                    <input type="password" className={styles.authInput} placeholder="Password" />
                    <button className={styles.authButton}>Sign up</button>
                    <footer className={styles.authFooter}>
                        Already have an account? <Link to="/login" className={styles.authToggle}>Log in</Link>
                    </footer>
                </div>
                <div className={styles.authTermPolicy}>By signing up, you agree to Quiz Qrafter's <Link to="/terms">Terms of Use</Link> and <Link to="/privacy">Privacy Policy</Link>.</div>
            </div>
        </>
    );
};

export default SignUp;
