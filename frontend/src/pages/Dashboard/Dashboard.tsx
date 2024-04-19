import React, { useState } from 'react';
import { useAuth } from '../../services/auth';
import styles from './dashboard.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import sbStyles from '../../components/Sidebar/sidebar.module.css';
import Logo from "../../assets/quiz_qrafter_logo_dark.svg";
import { useTheme } from '../../containers/Admin/ThemeContext';
import Quiz from '../../containers/Admin/Quiz';
import Settings from '../../containers/Admin/Settings';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const themeColors = {
    light: '#7a84f9',
    dark: '#808080'
  };

  const { theme} = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentColor = themeColors[theme];
  const [activeMenu, setActiveMenu] = useState<'quiz' | 'settings'>('quiz');

  const handleSignOut = () => {
    signOut();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={styles.dashboard}>
        <header className={styles.header} style={{ backgroundColor: currentColor }}>
          <div className={styles.logoMenu}>
            <button onClick={toggleSidebar} className={styles.menuButton}>
              ☰
            </button>

          </div>
          <img src={Logo} alt="Quiz Qrafter" className={styles.dashboardLogo} />
          <div className={styles.headerContent}>
            <span className={styles.email}>{user?.email}</span>
            <button onClick={handleSignOut} className={styles.logoutButton}>
              LOGOUT
            </button>
          </div>
        </header>
        <div className={styles.mainContent}>
          <div className={`${sbStyles.sidebar} ${sidebarOpen ? sbStyles.open : ''}`}>
            <Sidebar isOpen={sidebarOpen} closeSidebar={toggleSidebar} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </div>
          <main className={`${styles.content} ${sidebarOpen ? styles.contentWithSidebar : ''}`}>
            {activeMenu === 'quiz' ? (
              <Quiz />
            ) : (
              <Settings/>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
