import React from 'react';
import styles from './sidebar.module.css';
import { useTheme } from '../../containers/Admin/ThemeContext';
import settingsIcon from '../../assets/settings_icon.svg'; 

const Sidebar: React.FC<{
    isOpen: boolean,
    closeSidebar: () => void,
    activeMenu: 'quiz' | 'settings',
    setActiveMenu: (menu: 'quiz' | 'settings') => void
    toggleSettings?: () => void
}> = ({ isOpen, closeSidebar, activeMenu, setActiveMenu, toggleSettings }) => {

    const { theme } = useTheme();
    const themeColors = {
        light: '#7a84f9',
        dark: '#808080'
    };

    const currentColor = themeColors[theme];

    const handleMenuClick = (menu: 'quiz' | 'settings') => {
        setActiveMenu(menu);
    };

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} style={{ backgroundColor: currentColor }}>
            <button className={styles.closeButton} onClick={closeSidebar}>×</button>
            <nav className={styles.nav}>
                <ul>
                    <li className={activeMenu === 'quiz' ? styles.active : ''} onClick={() => handleMenuClick('quiz')}>
                        <button>Quiz</button>
                    </li>
                    <li className={activeMenu === 'settings' ? styles.active : ''} onClick={() => handleMenuClick('quiz')}>
                        <button onClick={toggleSettings}>Settings</button>
                    </li>
                </ul>
            </nav>
            
        </aside>
    );
};

export default Sidebar;