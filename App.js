import { QueryClientProvider, QueryClient } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContextProvider } from './src/context/Theme';
import Root from './src/Navigations/Root';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
