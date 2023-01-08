import { View, Text, TouchableOpacity } from 'react-native';

const SignupPage = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate('Tabs', { screen: '메인 페이지' })}
      >
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('로그인')}>
        <Text>로그인 페이지로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupPage;
