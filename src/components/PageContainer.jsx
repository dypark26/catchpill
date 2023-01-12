import { useContext } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemeContext } from '../context/Theme';

const PageContainer = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      theme={theme}
      style={{
        ...Platform.select({
          ios: {
            flex: 1,
            backgroundColor: 'white',
          },
          android: {
            flex: 1,
            paddingTop: 30,
            backgroundColor: 'white',
          },
        }),
        backgroundColor: theme === 'light' ? 'white' : 'black',
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default PageContainer;
