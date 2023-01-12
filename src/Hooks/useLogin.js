import { signInWithEmailAndPassword } from 'firebase/auth';
import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';
import { auth } from '../shared/firebase';

export const SignIn = async (payload) => {
  const { email, password } = payload;
  Keyboard.dismiss(); // 버튼 클릭 시 키보드 접기
  return signInWithEmailAndPassword(auth, email, password);
};
export const useSignIn = () => {
  return useMutation(SignIn, {
    onError: (error) => {
      if (error.message.includes('user-not-found')) {
        alert('회원이 아닙니다. 회원가입을 먼저 진행해 주세요.');
      } //비밀번호가 틀리면 아래 alert출력
      if (error.message.includes('wrong-password')) {
        alert('비밀번호가 틀렸습니다.');
      }
    },
  });
};
