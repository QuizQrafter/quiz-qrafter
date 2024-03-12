import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Assuming this path is correct
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageBad, setMessageBad] = useState("");
    const [token, setToken] = useState("");
    const [errorNew,setErrorNew] = useState(""); 
    const [errorConfirm,setErrorConfirm] = useState(""); 
    const [isValid, setValidation] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        if (token) {
        setToken(token);
        } else {
        navigate("/login"); // Redirect if no token is found
        }
    }, [location, navigate]);

    const checkNewPassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
      };

      useEffect(() => {
        let isValidNewPassword = checkNewPassword(newPassword);
        let isValidConfirmPassword = checkNewPassword(confirmPassword);
        let passwordsMatch = newPassword === confirmPassword;
    
        setErrorNew(isValidNewPassword ? "" : "*Password should have at least 8 characters and one upper case letter*");
        setErrorConfirm(
          isValidConfirmPassword
            ? passwordsMatch
              ? ""
              : "*Passwords do not match*"
            : "*Password should have at least 8 characters and one upper case letter*"
        );
        setMessageBad(passwordsMatch ? "" : "*Passwords do not match*");
    
        setValidation(isValidNewPassword && isValidConfirmPassword && passwordsMatch);
      }, [newPassword, confirmPassword]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!isValid) return;

        try { 
            const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        });

        if (!response.ok) {
            throw new Error('Failed to reset password');
        }

        setMessage("Your password has been successfully updated.");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
        } catch (error) {
        setMessageBad("There was an error updating your password. Please try again.");
        }
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
              <h1 className={styles.authTitle}>Update Your Password</h1>
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="password"
                  className={styles.authInput}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                {errorNew && <p className={styles.authError}>{errorNew}</p>}
                <input
                  type="password"
                  className={styles.authInput}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {errorConfirm && <p className={styles.authError}>{errorConfirm}</p>}
                <button 
                type="submit"
                className={`${styles.authButton} ${isValid ? styles.authButton : styles.disabledButton}`}
                disabled={!isValid}
                >Update Password</button>
              </form>
              {message && <p className={styles.authMessage}>{message}</p>}
              {messageBad && <p className={styles.authMessageBad}>{messageBad}</p>}
            </div>
          </div>
        </>
      );
    };
    
    export default UpdatePassword;