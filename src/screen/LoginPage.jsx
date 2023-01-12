import { SafeAreaView, Text, TextInput, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { useState, useContext } from 'react';
import { COLORS } from '../shared/color';
import { ThemeContext } from '../context/Theme';
import { ToggleModeButton } from '../context/Theme';
import { useSignIn } from '../Hooks/useAuth';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { PageContainer } from '../components/index';

const LoginPage = ({ navigation: { navigate } }) => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [emailTestError, setEmailTestError] = useState(false);
  const [passwordTestError, setPasswordTestError] = useState(false);

  const regex = {
    email: new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
    password: new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/,
    ), // 6자 이상, 14자 이하의 영어 대,소문자, 1개 이상의 숫자, 특수문자 조합
  };

  const matchedEmail = email.match(regex.email);
  const matchedPw = password.match(regex.password);

  const { mutate: SignIn } = useSignIn(navigate);

  //이메일이나 비밀번호가 빈칸이면 alert출력
  const handleLogin = (email, password) => {
    if (!email) {
      alert('email을 입력해주세요.');
      return;
    }
    if (!password) {
      alert('password를 입력해주세요.');
      return;
    }
    if (matchedEmail === null) {
      setEmailTestError(true);
      return;
    }
    if (matchedPw === null) {
      setPasswordTestError(true);
      return;
    } else {
      SignIn({ email, password, navigate });
      setEmail('');
      setpassword('');
    }
  };

  return (
    <PageContainer>
      <LoginContainer theme={theme}>
        <ToggleModeButton />
        {/* 이메일 인풋 */}
        <CustomInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          placeholder="이메일을 입력하세요"
          title="아이디"
          theme={theme}
        />
        {emailTestError && (
          <LoginErrorText>이메일이 올바르지 않습니다.</LoginErrorText>
        )}
        {/* 비밀번호 인풋 */}
        <CustomInput
          value={password}
          onChangeText={(text) => setpassword(text)}
          secureTextEntry={true}
          returnKeyType="send"
          placeholder="비밀번호를 입력하세요"
          title="비밀번호"
          theme={theme}
        />
        {passwordTestError && (
          <LoginErrorText>
            8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.
          </LoginErrorText>
        )}

        {/* 로그인 버튼 */}
        <CustomButton
          title="Login"
          onPress={() => handleLogin(email, password)}
          buttonText="로그인"
        />
        {/* 회원가입 버튼 */}
        <CustomButton
          title="Login"
          onPress={() => navigate('회원가입')}
          buttonText="회원가입"
        />
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.View`
  padding-left: 20px;
  flex: 1;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
`;
const LoginErrorText = styled.Text`
  color: ${COLORS.DANGER};
  padding: 10px 0;
`;
