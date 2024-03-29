import React, { createContext, useContext, useState } from 'react';

// Define a type for the context state
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

// Export the hook to be used in your components
export const useTheme = () => useContext(ThemeContext);

// Create a provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Toggle between 'light' and 'dark'
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
