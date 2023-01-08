import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditPage from '../screen/EditPage';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditPage" component={EditPage} />
    </Stack.Navigator>
  );
};

export default Stacks;
