import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';
import logo from "../../assets/courses.png";



const Sidebar: React.FC = () => {

    const currPage = useLocation();
    
    return (
        <div className={styles.sidebar}>
            <img src = {logo} alt = "logo"></img>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Sign in</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;