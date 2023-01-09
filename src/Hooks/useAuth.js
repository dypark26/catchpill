import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Keyboard } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { auth } from '../shared/firebase';
s;
export const handleSignUp = async (email, password) => {
  Keyboard.dismiss(); // 버튼 클릭 시 키보드 접기
  return createUserWithEmailAndPassword(auth, email, password);
};

useMutation(() => handleSignUp(email, password), {
  onError: (error) => {
    if (error.message.includes('email-already-in-use')) {
      alert(
        '이미 가입된 이메일입니다. 로그인을 시도하거나 다른 이메일을 사용해 주세요.',
      );
    }
  },
});

const getUID = () => {
  return auth;
};

export const useUID = () => {
  return useQuery('uid', getUID, {
    select: (data) => {
      return data?.currentUser?.uid;
    },
  });
};
