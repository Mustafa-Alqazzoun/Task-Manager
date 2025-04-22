import { createContext, useContext, useState, useEffect } from 'react';

// Theme definitions
export const themes = {
  blue: {
    name: 'Blue Serenity',
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#0d47a1',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#26a69a',
        light: '#4db6ac',
        dark: '#00796b',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },
  },
  lavender: {
    name: 'Lavender Calm',
    palette: {
      primary: {
        main: '#7e57c2',
        light: '#9575cd',
        dark: '#5e35b1',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#26c6da',
        light: '#4dd0e1',
        dark: '#0097a7',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8f6fd',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },
  },
  mint: {
    name: 'Mint Breeze',
    palette: {
      primary: {
        main: '#26a69a',
        light: '#4db6ac',
        dark: '#00796b',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f2f8f6',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },
  },
  peach: {
    name: 'Peach Harmony',
    palette: {
      primary: {
        main: '#ff8a65',
        light: '#ffab91',
        dark: '#e64a19',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#4db6ac',
        light: '#80cbc4',
        dark: '#00796b',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fff8f5',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },
  },
  rose: {
    name: 'Rose Tranquil',
    palette: {
      primary: {
        main: '#ec407a',
        light: '#f48fb1',
        dark: '#c2185b',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#7986cb',
        light: '#9fa8da',
        dark: '#3949ab',
        contrastText: '#ffffff',
      },
      background: {
        default: '#fdf5f8',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#757575',
      },
    },
  },
  dark: {
    name: 'Dark Mode',
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
        contrastText: '#000000',
      },
      secondary: {
        main: '#f48fb1',
        light: '#fce4ec',
        dark: '#f06292',
        contrastText: '#000000',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0bec5',
      },
    },
  },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or default to blue
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'blue';
  });

  // Update theme and save to localStorage
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
    }
  };

  const value = {
    currentTheme,
    themeData: themes[currentTheme],
    changeTheme,
    availableThemes: Object.keys(themes).map(key => ({
      id: key,
      name: themes[key].name
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};