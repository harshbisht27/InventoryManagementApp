import React, { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark(prevState => !prevState);
  }, []);

  const colors = {
    primary: '#007AFF',
    background: isDark ? '#000000' : '#FFFFFF',
    surface: isDark ? '#121212' : '#F5F5F5',
    text: isDark ? '#FFFFFF' : '#000000',
    border: isDark ? '#333333' : '#E0E0E0',
    error: '#FF3B30',
  };

  const value = {
    isDark,
    setIsDark,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 