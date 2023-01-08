import { useMutation } from 'react-query';
import { dbService } from '../shared/firebase';
import { addDoc, collection } from 'firebase/firestore';

// 약 추가 함수 / firestore에 약 새로운 약 정보 추가
const addPill = (pill) => {
  return addDoc(collection(dbService, 'pill'), pill);
};

// 약 추가 함수
export const useAddPillData = () => {
  return useMutation(addPill);
};
