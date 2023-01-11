import { createContext, useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ThemeContext = createContext();

export const ToggleModeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
    >
      <Text>{theme === 'light' ? '☀️' : '🌕'}</Text>
    </TouchableOpacity>
  );
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
