import { SafeAreaView, Text, TextInput } from 'react-native';
import styled from '@emotion/native';
import { useState } from 'react';
import { auth } from '../shared/firebase';
import { useSignIn } from '../Hooks/useLogin';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const LoginPage = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const { mutate: SignIn } = useSignIn();

  //이메일이나 비밀번호가 빈칸이면 alert출력
  const handleLogin = (email, password) => {
    if (!email) {
      alert('email을 입력해주세요.');
      return true;
    } else if (!pw) {
      alert('password를 입력해주세요.');
      return true;
    } else {
      setEmail('');
      setPw('');
      navigate('Tabs', { screen: '메인 페이지' });
      SignIn({ email, password });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginContainer>
        {/* 이메일 인풋 */}
        <CustomInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          placeholder="이메일을 입력하세요"
          title="아이디"
        />
        {/* 비밀번호 인풋 */}
        <CustomInput
          value={pw}
          onChangeText={(text) => setPw(text)}
          secureTextEntry={true}
          returnKeyType="send"
          placeholder="비밀번호를 입력하세요"
          title="비밀번호"
        />

        {/* 로그인 버튼 */}
        <CustomButton
          title="Login"
          onPress={() => handleLogin(email, pw)}
          buttonText="로그인"
        />
        {/* 회원가입 버튼 */}
        <CustomButton
          title="Login"
          onPress={() => navigate('회원가입')}
          buttonText="회원가입"
        />
      </LoginContainer>
    </SafeAreaView>
  );
};

export default LoginPage;

const LoginContainer = styled.View`
  padding-left: 20px;
  flex: 1;
  background-color: #fff;
`;
