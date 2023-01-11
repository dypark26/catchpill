import { SafeAreaView, Text } from 'react-native';
import styled from '@emotion/native';
import { useState } from 'react';
import { auth } from '../shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CustomButton } from '../components/CustomButton';
import { CustomInputText, CustomTotalInput } from '../components/CustomInput';

const LoginPage = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  //이메일이나 비밀번호가 빈칸이면 alert출력
  const handleLogin = () => {
    if (!email) {
      alert('email을 입력해주세요.');
      return true;
    }
    if (!pw) {
      alert('password를 입력해주세요.');
      return true;
    } else return;
  };
  // 로그인 요청
  signInWithEmailAndPassword(auth, email, pw)
    .then(() => {
      setEmail('');
      setPw('');
      navigate('Tabs', { screen: '메인 페이지' });
    })
    .catch((err) => {
      //아이디가 없으면 아래 alert출력
      if (err.message.includes('user-not-found')) {
        alert('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
      } //비밀번호가 틀리면 아래 alert출력
      if (err.message.includes('wrong-password')) {
        alert('비밀번호가 틀렸습니다.');
      }
    });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginContainer>
        {/* 이메일 인풋 */}
        <CustomInputText>아이디</CustomInputText>
        <CustomTotalInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          placeholder="이메일을 입력하세요"
        />
        {/* 비밀번호 인풋 */}
        <CustomInputText>비밀번호</CustomInputText>
        <CustomTotalInput
          value={pw}
          onChangeText={(text) => setPw(text)}
          secureTextEntry={true}
          returnKeyType="send"
          placeholder="비밀번호를 입력하세요"
        />
        {/* 로그인 버튼 */}
        <CustomButton title="Login" onPress={() => handleLogin()}>
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
