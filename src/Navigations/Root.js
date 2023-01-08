import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stacks from './Stacks';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Stacks" component={Stacks} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Root;
