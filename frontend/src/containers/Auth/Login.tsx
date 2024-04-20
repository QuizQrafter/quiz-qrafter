import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/quiz_qrafter_logo_dark.svg";
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";

const Login = () => {
  const { authenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [isValid, setValidation] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, navigate]);

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
  };
  const handleEmail = (email: string) => {
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

    if (isValid) {
      try {
        login(email, password);
        setValidation(true);
        setError({});

      } catch (error: any) {
        setError({ general: error.message });
      }
    }
  };

  const notify = () => toast.info("Reach out to the Quizqrafter team at quizqrafter@gmail.com to reset your password.", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  return (
    <>
      <ToastContainer />
      <header className={styles.authHeader}>
        <Link to="/">
          <img src={Logo} alt="Quiz Qrafter" className={styles.authLogo} />
        </Link>
      </header>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Welcome back</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className={styles.authInput}
              placeholder="Email"
              onChange={(event) => handleEmail(event.target.value)}
            />
            {error.email && <p className={styles.authError}>{error.email}</p>}
            <input
              type="password"
              className={styles.authInput}
              placeholder="Password"
              onChange={(event) => handlePassword(event.target.value)}
            />
            {error.password && <p className={styles.authError}>{error.password}</p>}
            <button
              type="submit"
              className={`${styles.authButton} ${isValid ? '' : styles.disabledButton}`}
              disabled={!isValid}
            >
              Log in
            </button>
          </form>
          <button onClick={notify} className={styles.authToggle} style={{ background: 'none', border: 'none', color: '#007bff' }}>
            Forgot Password
          </button>
          <footer className={styles.authFooter}>
            Don't have an account? <Link to="/signup" className={styles.authToggle}>Sign up</Link>
          </footer>
        </div>
        <footer className={styles.authTermPolicy}>
          By signing up, you agree to Quiz Qrafter's Terms of Use and Privacy Policy.
        </footer>
      </div>
    </>
  );
};

export default Login;