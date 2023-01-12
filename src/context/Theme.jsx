import { createContext, useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';

const ThemeContext = createContext();

export const ToggleModeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <CustomButton
      title="Login"
      buttonText={theme === 'light' ? '🌕 다크 모드로' : '☀️ 라이트 모드로'}
      onPress={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
    ></CustomButton>
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
