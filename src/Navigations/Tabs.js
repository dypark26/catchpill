import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyPage, MainPage } from '../screen/Index';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={25} color="black" />
            ) : (
              <Entypo name="home" size={25} color="lightgrey" />
            ),
        }}
        name="메인 페이지"
        component={MainPage}
      />

      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="list-ul" size={23} color="black" />
            ) : (
              <FontAwesome name="list-ul" size={23} color="lightgrey" />
            ),
        }}
        name="마이 페이지"
        component={MyPage}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
