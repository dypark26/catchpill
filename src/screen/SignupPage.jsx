import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { handleSignUp } from '../Hooks/useAuth';

const regex = {
  email: new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
  password: new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/,
  ), // 6자 이상, 14자 이하의 영어 대,소문자, 1개 이상의 숫자, 특수문자 조합
};

export const SignupPage = () => {
  const [email, setEmail] = useState(''); // 이메일 값 저장
  const [password, setPassword] = useState(''); // 비밀번호 값 저장
  const [correctEmail, setCorrectEmail] = useState(true); // 이메일 유효성 검사
  const [correctPassword, setCorrectPassword] = useState(true); // 비밀번호 유효성 검사
  const [visablePassword, setVisablePassword] = useState(false); // 비밀번호 보이게

  const vaildEmail = (event) => {
    // 유효성 검사 후 false가 나오면 문구 띄우기
    regex.email.test(event.nativeEvent.text) === true
      ? setCorrectEmail(true)
      : setCorrectEmail(false);
  };

  const vaildPassword = (event) => {
    // 유효성 검사 후 false가 나오면 문구 띄우기
    regex.password.test(event.nativeEvent.text) === true
      ? setCorrectPassword(true)
      : setCorrectPassword(false);
  };

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
      handleSignUp(email, password);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <SafeAreaView>
      <Text>아이디</Text>
      <TextInput
        type="text"
        keyboardType="email-address"
        placeholder="아이디를 입력해주세요!"
        value={email}
        onChangeText={setEmail}
        onChange={(text) => vaildEmail(text)}
      />
      {correctEmail || (
        <Text>
          {email === ''
            ? '필수 입력값입니다.'
            : '올바른 형식의 이메일을 작성해주세요'}
        </Text>
      )}
      <Text>비밀번호</Text>
      <TextInput
        type="password"
        keyBoardType="default"
        placeholder="비밀번호를 입력해주세요!"
        value={password}
        onChangeText={setPassword}
        onChange={(text) => vaildPassword(text)}
        secureTextEntry={visablePassword}
      />
      {correctPassword || (
        <Text>
          {password === ''
            ? '필수 입력값입니다.'
            : '비밀번호는 6자리 이상, 14자리 이하의 영어 대, 소문자, 1개 이상의 숫자와 특수문자(!@#$%^&*) 조합이어야 합니다.'}
        </Text>
      )}
      <TouchableOpacity onPress={() => setVisablePassword(!visablePassword)}>
        <Text>👁</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickSignUpButton(email, password)}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
