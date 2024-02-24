import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {label}
  </button>
);

export default Button;
