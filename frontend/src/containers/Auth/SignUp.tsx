import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/quiz_qrafter_logo_dark.svg"; // Use a regular image tag for SVGs
import { useAuth } from "../../services/auth";
import styles from "./auth.module.css";
import buttonStyles from "./authButton.module.css";
import { check } from "prettier";

const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [error,setError] = useState<Record<string, string>>({}); 
  const [buttonClass,setButtonStyle] = useState("");
  const navigate = useNavigate();
  const [isValid, setValidation] = useState(false);
   

  useEffect(() => { //concatenate first and last name
    setFullname(`${firstname} ${lastname}`);
  }, [firstname, lastname]);

  const checkPwd = (password: string): boolean => {
    const regex =/^(?=.*[A-Z]).{8,}$/;  //check if the password contains at least 8 characters with at least 1 upper case
    return regex.test(password);
  };

  const checkEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const checkValid = () => {
    const newError: Record<string, string> = {};

    if (!firstname) {
      newError.firstname = "*First name is required*";
    }

    if (!lastname) {
      newError.lastname = "*Last name is required*";
    }

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

  const handleFirstName = (firstName: string)=> {
    setFirstname(firstName);
    checkValid();
  }

  const handleLastName = (lastName: string)=> {
    setLastname(lastName);
    checkValid();
  }

  const handleEmail = (email: string)=> {
    setEmail(email);
    checkValid();
  }

  const handlePassword = (password: string) => {
    setPassword(password);
    checkValid();
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkValid();

    if(isValid){
      try {
        signUp(email, password, fullname);
        setValidation(true);
        navigate("/login", { replace: true });
        setError({});
        console.log(fullname);

      } catch (error:any) {
        setError({ general: error.message});
      }
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
          <h1 className={styles.authTitle}>Get started with Quiz Qrafter</h1>

          <form action ="" onSubmit = {handleSignUp}>
            <input
              type="text"
              className={styles.authInput}
              placeholder="First Name"
              onChange={(event) => handleFirstName(event.target.value)}
              value = {firstname}
            />

            {error && <p style={{ marginTop: "-15px", marginBottom: "1px",padding: "3px", fontSize: "0.8rem", color: "red",textAlign:"left" }}>{error.firstname}</p>}
            <input
              type="text"
              className={styles.authInput}
              placeholder="Last Name"
              onChange={(event) => handleLastName(event.target.value)}
              value = {lastname}
            />

            {error && <p style={{ marginTop: "-15px", marginBottom: "1px",padding: "3px", fontSize: "0.8rem", color: "red",textAlign:"left" }}>{error.lastname}</p>}
            <input
              type="text"
              className={styles.authInput}
              placeholder="Email"
              onChange={(event) => handleEmail(event.target.value)}
              value = {email}
            />

            {error && <p style={{ marginTop: "-15px", marginBottom: "1px",padding: "3px", fontSize: "0.8rem", color: "red",textAlign:"left" }}>{error.email}</p>}
            <input
              type="password"
              className={styles.authInput}
              placeholder="Password"
              onChange={(event) => handlePassword(event.target.value)}
              value = {password}        
            />

            {error && <p style={{ marginTop: "-15px", marginBottom: "1px",padding: "3px", fontSize: "0.8rem", color: "red",textAlign:"left" }}>{error.password}</p>}
            <button 
            type="submit" 
            className={`${buttonStyles.authButton} ${isValid ? buttonStyles.authButton : buttonStyles.disabledButton}`}
            disabled={!isValid}
            >
              Sign up
            </button>
          </form>


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
