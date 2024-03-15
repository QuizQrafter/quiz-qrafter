import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Assuming this path is correct
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setValidation] = useState(false);
  const [error,setError] = useState<Record<string, string>>({}); 
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        // Assuming there's a function in useAuth or another service to request password reset
        // await useAuth().requestPasswordReset(email);
        setMessage("If an account exists for this email, a password reset link has been sent.");
        setTimeout(() => navigate("/login"), 5000); // Redirect to login after 5 seconds
      } catch (error) {
        setMessage("There was an error processing your request. Please try again later.");
    }
  };

  const checkEmail = (email: string): boolean => {
    // You can use a regex or any other validation method here
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };


  const checkValid = () => {
    const newError: Record<string, string> = {};

    if (!email.trim()) {
      newError.email = "*Email is required*";
    } else if (!checkEmail(email)) {
      newError.email = "*Email address should contain '@'*";
    }

    setError(newError);
    const isValid = Object.keys(newError).length === 0;
    setValidation(isValid);
    // return isValid;
  };

  const handleEmail = (email: string)=> {
    setEmail(email);
    checkValid();
  }

  return (
    <>
      <header className={styles.authHeader}>
        <Link to="/">
          <img src={Logo} alt="Quiz Qrafter" className={styles.authLogo} />
        </Link>
      </header>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Forgot Password</h1>
          <form action="" onSubmit={handleSubmit}>
          
            <input
              type="email"
              className={styles.authInput}
              placeholder="Enter your email"
              value={email}
              onChange={(event) => handleEmail(event.target.value)}
            />
            {error && <p className={styles.authError}>{error.email}</p>}
            <button 
            type="submit" 
            className={`${styles.authButton} ${isValid ? styles.authButton : styles.disabledButton}`}
            disabled={!isValid}
            >Send Reset Link</button>
          </form>
          {message && <p className={styles.authMessage}>{message}</p>}
          <footer className={styles.authFooter}>
            <Link to="/login" className={styles.authToggle}>
              Back to login
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
