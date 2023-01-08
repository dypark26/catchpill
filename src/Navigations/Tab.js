import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPage from '../screen/MyPage';
import MainPage from '../screen/MainPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainPage} />
      <Tab.Screen name="My" component={MyPage} />
    </Tab.Navigator>
  );
};

export default Tabs;
