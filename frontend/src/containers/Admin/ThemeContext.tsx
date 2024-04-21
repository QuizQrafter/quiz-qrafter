import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Initialize theme state with value from localStorage or default to 'light'
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Get theme from localStorage or fall back to the default 'light' theme
        const savedTheme = localStorage.getItem('theme');
        return savedTheme as 'light' | 'dark' || 'light';
    });

    // Toggle between 'light' and 'dark'
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // Save new theme to localStorage
            return newTheme;
          });
    };
    // Effect for initial read from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme as 'light' | 'dark');
        }
      }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
