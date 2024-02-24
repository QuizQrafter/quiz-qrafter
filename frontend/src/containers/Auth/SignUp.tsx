import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Use a regular image tag for SVGs
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";

const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    signUp(email, password, fullname);
    navigate("/login", { replace: true });
  };

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
          <input
            type="text"
            className={styles.authInput}
            placeholder="Full Name"
            onChange={(event) => setFullname(event.target.value)}
          />
          <input
            type="email"
            className={styles.authInput}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className={styles.authInput}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className={styles.authButton} onClick={handleSignUp}>
            Sign up
          </button>
          <footer className={styles.authFooter}>
            Already have an account?{" "}
            <Link to="/login" className={styles.authToggle}>
              Log in
            </Link>
          </footer>
        </div>
        <div className={styles.authTermPolicy}>
          By signing up, you agree to Quiz Qrafter's{" "}
          <Link to="/terms">Terms of Use</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </div>
      </div>
    </>
  );
};

export default SignUp;
