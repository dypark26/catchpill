import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/native';
import { authService, dbService } from '../shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ navigation: { navigate } }) => {
  const checkPW = useRef(null);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    if (!email) {
      alert('email을 입력해주세요.');
      email.current.focus();
      return true;
    }
    if (!pw) {
      alert('password를 입력해주세요.');
      pw.current.focus();
      return true;
    }

    // 로그인 요청
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail('');
        setPw('');
        navigate('Tabs', { screen: '메인 페이지' });
      })
      .catch((err) => {
        if (err.message.includes('user-not-found')) {
          alert('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
        }
        if (err.message.includes('wrong-password')) {
          alert('비밀번호가 틀렸습니다.');
        }
      });
  };
  return (
    <View>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
        placeholder="아이디를 입력하세요"
      />
      <TextInput
        ref={checkPW}
        value={pw}
        onChangeText={(text) => setPw(text)}
        textContentType="password"
        returnKeyType="send"
        placeholder="비밀번호를 입력하세요"
      />
      <TouchableOpacity onPress={() => handleLogin()}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('SignupPage')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
