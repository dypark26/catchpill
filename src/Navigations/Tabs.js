import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingPage, MyPage, MainPage } from '../screen/Index';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 10, color: 'black' }}>메인 페이지</Text>
            ) : (
              <Text style={{ fontSize: 10, color: 'lightgrey' }}>
                메인 페이지
              </Text>
            ),
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
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 10, color: 'black' }}>약 리스트</Text>
            ) : (
              <Text style={{ fontSize: 10, color: 'lightgrey' }}>
                약 리스트
              </Text>
            ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="list-ul" size={24} color="black" />
            ) : (
              <FontAwesome name="list-ul" size={23} color="lightgrey" />
            ),
        }}
        name="필 리스트"
        component={MyPage}
      />

      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={{ fontSize: 10, color: 'black' }}>설정</Text>
            ) : (
              <Text style={{ fontSize: 10, color: 'lightgrey' }}>설정</Text>
            ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="settings-sharp" size={24} color="lightgrey" />
            ),
        }}
        name="설정"
        component={SettingPage}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
