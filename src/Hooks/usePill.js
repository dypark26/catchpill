import { useMutation } from 'react-query';
import { dbService } from '../shared/firebase';
import { addDoc, deleteDoc, collection, query, doc } from 'firebase/firestore';

// 약 추가 함수 / firestore에 약 새로운 약 정보 추가
const addPill = (pill) => {
  return addDoc(collection(dbService, 'pill'), pill);
};

// 약 추가 함수
export const useAddPillData = () => {
  return useMutation(addPill);
};

// 약 삭제 함수 / firestore에 새로운 약 정보 삭제
const deletePill = (pill) => {
  return deleteDoc(doc(dbService, 'pill', pill));
};

// 약 삭제 함수
export const useDeletePillData = () => {
  return useMutation(deletePill, {
    onError: () => {
      console.log('ㅗ');
    },
    onSuccess: () => {
      console.log('ㅇㅇ');
    },
  });
};
