import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignupPage, LoginPage, EditPage } from '../screen/Index';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="회원가입">
      <Stack.Screen name="회원가입" component={SignupPage} />
      <Stack.Screen name="로그인" component={LoginPage} />
      <Stack.Screen name="수정 페이지" component={EditPage} />
    </Stack.Navigator>
  );
};

export default Stacks;
