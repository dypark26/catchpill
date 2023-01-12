import styled from '@emotion/native';
import { useContext, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSignup } from '../Hooks/useAuth';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../shared/color';
import { ThemeContext } from '../context/Theme';
import { PageContainer } from '../components/index';
import { CustomButton, CustomInput } from '../components/index';

const regex = {
  email: new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
  password: new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/,
  ), // 6자 이상, 14자 이하의 영어 대,소문자, 1개 이상의 숫자, 특수문자 조합
};

const SignupPage = ({ navigation: { navigate } }) => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState(''); // 이메일 값 저장
  const [password, setPassword] = useState(''); // 비밀번호 값 저장
  const [correctEmail, setCorrectEmail] = useState(true); // 이메일 유효성 검사
  const [correctPassword, setCorrectPassword] = useState(true); // 비밀번호 유효성 검사
  const [visiblePassword, setVisiblePassword] = useState(true); // 비밀번호 보이게

  const validEmail = (event) => {
    // 유효성 검사 후 false가 나오면 문구 띄우기
    regex.email.test(event.nativeEvent.text) === true
      ? setCorrectEmail(true)
      : setCorrectEmail(false);
  };

  const validPassword = (event) => {
    // 유효성 검사 후 false가 나오면 문구 띄우기
    regex.password.test(event.nativeEvent.text) === true
      ? setCorrectPassword(true)
      : setCorrectPassword(false);
  };

  const { mutate: SignUp } = useSignup();

  const onClickSignUpButton = (email, password) => {
    //양식 제출 시, 빈값, 유효성 검사 틀린 값 잡아내서 리턴 후 오류 문구 띄우기
    if (
      (email === '' && password === '') ||
      (correctEmail === false && correctPassword === false)
    ) {
      setCorrectEmail(false);
      setCorrectPassword(false);
      return;
    } else if (email === '' || correctEmail === false) {
      setCorrectEmail(false);
      return;
    } else if (password === '' || correctPassword === false) {
      setCorrectPassword(false);
      return;
    } else {
      SignUp({ email, password });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <PageContainer>
      <FormContainer theme={theme}>
        <BackToLoginPageButton onPress={() => navigate('로그인')}>
          <FontAwesome
            name="chevron-left"
            size={23}
            color={theme === 'light' ? 'black' : 'white'}
          />
        </BackToLoginPageButton>
        <InputContainer>
          <CustomInput
            title="아이디"
            theme={theme}
            type="text"
            keyboardType="email-address"
            placeholder="아이디를 입력해주세요!"
            value={email}
            onChangeText={setEmail}
            onChange={(text) => validEmail(text)}
          />

          {correctEmail || (
            <ErrorText>
              {email === ''
                ? '필수 입력값입니다.'
                : '올바른 형식의 이메일을 작성해주세요.'}
            </ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <CustomInput
            title="비밀번호"
            theme={theme}
            type="password"
            keyBoardType="default"
            placeholder="비밀번호를 입력해주세요!"
            value={password}
            onChangeText={setPassword}
            onChange={(text) => validPassword(text)}
            secureTextEntry={visiblePassword}
          />
          <PasswordShowButton
            onPress={() => setVisiblePassword(!visiblePassword)}
          >
            <FontAwesome
              name={visiblePassword ? 'eye' : 'eye-slash'}
              size={25}
              color={theme === 'light' ? '#d5d5d5' : '#636568'}
            />
          </PasswordShowButton>
        </InputContainer>
        {correctPassword || (
          <ErrorText>
            {password === ''
              ? '필수 입력값입니다.'
              : '비밀번호는 6자리 이상, 14자리 이하의 영어 대, 소문자, 1개 이상의 숫자와 특수문자(!@#$%^&*) 조합이어야 합니다.'}
          </ErrorText>
        )}
        <CustomButton
          title="Login"
          buttonText="회원가입"
          onPress={() => onClickSignUpButton(email, password)}
        ></CustomButton>
      </FormContainer>
    </PageContainer>
  );
};

const FormContainer = styled.View`
  height: 100%;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
  margin: 0px 16px 0px;
`;

const BackToLoginPageButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const InputContainer = styled.View``;

const ErrorText = styled.Text`
  color: ${COLORS.DANGER};
  padding: 10px 0;
`;

const PasswordShowButton = styled.Text`
  position: absolute;
  top: 60%;
  right: 20px;
`;

export default SignupPage;
