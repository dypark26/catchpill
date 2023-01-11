import styled from '@emotion/native';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { useSignup } from '../Hooks/useAuth';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../shared/color';

const regex = {
  email: new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
  password: new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/,
  ), // 6자 이상, 14자 이하의 영어 대,소문자, 1개 이상의 숫자, 특수문자 조합
};

const SignupPage = ({ navigation: { navigate } }) => {
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
    <SafeAreaView>
      <FormContainer>
        <BackToLoginPageButton onPress={() => navigate('로그인')}>
          <FontAwesome name="chevron-left" size={23} color="black" />
        </BackToLoginPageButton>
        <InputContainer>
          <LabelText>아이디</LabelText>
          <CustomInput
            type="text"
            keyboardType="email-address"
            placeholder="아이디를 입력해주세요!"
            value={email}
            onChangeText={setEmail}
            onChange={(text) => validEmail(text)}
            style={styles.textInputShadow}
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
          <LabelText>비밀번호</LabelText>
          <CustomInput
            type="password"
            keyBoardType="default"
            placeholder="비밀번호를 입력해주세요!"
            value={password}
            onChangeText={setPassword}
            onChange={(text) => validPassword(text)}
            secureTextEntry={visiblePassword}
            style={styles.textInputShadow}
          />
          <PasswordShowButton
            onPress={() => setVisiblePassword(!visiblePassword)}
          >
            <FontAwesome
              name={visiblePassword ? 'eye' : 'eye-slash'}
              size={25}
              color="gray"
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
        <CustomButton onPress={() => onClickSignUpButton(email, password)}>
          <CustomButtonText>회원가입</CustomButtonText>
        </CustomButton>
      </FormContainer>
    </SafeAreaView>
  );
};

const FormContainer = styled.View`
  padding: 10px;
  height: 100%;
  background-color: white;
`;

const BackToLoginPageButton = styled.TouchableOpacity`
  margin-bottom: 50px;
`;

const InputContainer = styled.View`
  position: relative;
`;

const LabelText = styled.Text`
  font-size: 28px;
  font-weight: 400;
  margin: 16px 0 10px 0;
`;

const ErrorText = styled.Text`
  color: ${COLORS.DANGER};
  padding: 10px 0;
`;

const PasswordShowButton = styled.Text`
  position: absolute;
  top: 65%;
  right: 5%;
`;

// 이후 교체 예정
const CustomButtonText = styled.Text`
  font-weight: 400;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  width: 100%;
`;

const CustomInput = styled.TextInput`
  padding: 12px 16px;
  border-radius: 16px;
  background-color: white;
`;

const CustomButton = styled.TouchableOpacity`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 148px;
  margin-top: 48px;
  width: 100%;
  height: 80px;
  background: #0feec6;
  border-radius: 16px;
`;
//

const styles = StyleSheet.create({
  textInputShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        backgroundColor: 'white',
        elevation: 5,
      },
    }),
  },
});

export default SignupPage;
