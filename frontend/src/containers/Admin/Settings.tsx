import React from 'react';
import { useTheme } from './ThemeContext';

const Settings = () => {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Additional settings can be added here */}
    </div>
  );
};

export default Settings;
