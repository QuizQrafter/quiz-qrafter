import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Use a regular image tag for SVGs
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";
import buttonStyles from "./authButton.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    signIn(email, password);
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, navigate]);

  return (
    <>
      <header className={styles.authHeader}>
        <Link to="/">
          <img src={Logo} alt="Quiz Qrafter" className={styles.authLogo} />
        </Link>
      </header>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Welcome back</h1>
          <input
            type="email"
            className={styles.authInput}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.authInput}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.authButton} onClick={handleSignIn}>
            Log in
          </button>
          <footer className={styles.authFooter}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.authToggle}>
              Sign up
            </Link>
          </footer>
        </div>
        <footer className={styles.authTermPolicy}>
          By signing up, you agree to Quiz Qrafter's{" "}
          <Link to="/terms">Terms of Use</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </footer>
      </div>
    </>
  );
};

export default SignIn;
