import { SafeAreaView, Text, TextInput } from 'react-native';
import styled from '@emotion/native';
import { useState } from 'react';
import { auth } from '../shared/firebase';
import { useSignIn } from '../Hooks/useLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomInputTitle from '../components/CustomInputTitle';

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
        <CustomInputTitle>아이디</CustomInputTitle>
        <CustomInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          placeholder="이메일을 입력하세요"
        />
        {/* 비밀번호 인풋 */}
        <CustomInputTitle>비밀번호</CustomInputTitle>
        <CustomInput
          value={pw}
          onChangeText={(text) => setPw(text)}
          secureTextEntry={true}
          returnKeyType="send"
          placeholder="비밀번호를 입력하세요"
        />

        {/* 로그인 버튼 */}
        <CustomButton title="Login" onPress={() => handleLogin(email, pw)}>
          <Text>로그인</Text>
        </CustomButton>
        {/* 회원가입 버튼 */}
        <CustomButton title="Login" onPress={() => navigate('회원가입')}>
          <Text>회원가입</Text>
        </CustomButton>
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
