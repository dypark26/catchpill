import { signInWithEmailAndPassword } from 'firebase/auth';
import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';
import { auth } from '../shared/firebase';

export const SignIn = async (payload) => {
  const { email, password } = payload;
  Keyboard.dismiss(); // 버튼 클릭 시 키보드 접기
  return signInWithEmailAndPassword(auth, email, password);
};
export const useSignIn = (navigate) => {
  return useMutation(SignIn, {
    onError: (err) => {
      if (err.message.includes('user-not-found')) {
        alert('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
      } //비밀번호가 틀리면 아래 alert출력
      if (err.message.includes('wrong-password')) {
        alert('비밀번호가 틀렸습니다.');
      }
    },
    onSuccess: () => {
      //네비게이션 메인페이지 이동
      navigate('Tabs', { screen: '메인 페이지' });
    },
  });
};
