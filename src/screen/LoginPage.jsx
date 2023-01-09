import { TouchableOpacity, View, Text } from 'react-native';

const LoginPage = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate('Tabs', { screen: '메인 페이지' })}
      >
        <Text>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('회원가입')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
