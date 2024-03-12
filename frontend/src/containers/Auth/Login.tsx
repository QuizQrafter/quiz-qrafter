import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Use a regular image tag for SVGs
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";

const Login = () => {
  const { authenticated, Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState<Record<string, string>>({}); 
  const [isValid, setValidation] = useState(false);
  const navigate = useNavigate();
  

  const checkEmail = (email: string): boolean => {
    // You can use a regex or any other validation method here
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const checkPwd = (password: string): boolean => {
    const regex = /^(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const checkValid = () => {
    const newError: Record<string, string> = {};

    if (!email.trim()) {
      newError.email = "*Email is required*";
    } else if (!checkEmail(email)) {
      newError.email = "*Email address should contain '@'*";
    }

    if (!checkPwd(password)) {
      newError.password = "*Password should have at least 8 characters and one upper case letter*";
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

  const handlePassword = (password: string) => {
    setPassword(password);
    checkValid();
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkValid();

    if(isValid){
      try {
        Login(email, password);
        setValidation(true);
        setError({});

      } catch (error:any) {
        setError({ general: error.message});
      }
    }
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

          <form action ="" onSubmit = {handleLogin}>

          <input
            type="email"
            className={styles.authInput}
            placeholder="Email"
            onChange={(event) => handleEmail(event.target.value)}
          />
          {error && <p className={styles.authError}>{error.email}</p>}

          <input
            type="password"
            className={styles.authInput}
            placeholder="Password"
            onChange={(event) => handlePassword(event.target.value)}
          />
          {error && <p className={styles.authError}>{error.password}</p>}

          <button 
            type="submit" 
            className={`${styles.authButton} ${isValid ? styles.authButton : styles.disabledButton}`}
            disabled={!isValid}
            >
            Log in
          </button>
          </form>

          <Link to="/forgot-password" className={styles.authToggle}>
              Forgot Password
            </Link>

          <footer className={styles.authFooter}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.authToggle}>
              Sign up
            </Link>
          </footer>
        </div>
        <footer className={styles.authTermPolicy}>
          By Logging up, you agree to Quiz Qrafter's{" "}
          <Link to="/terms">Terms of Use</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </footer>
      </div>
    </>
  );
};

export default Login;
