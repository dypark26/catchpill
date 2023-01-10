import { useQuery, useMutation } from 'react-query';
import { dbService } from '../shared/firebase';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';

// 약 추가 함수 / firestore에 약 새로운 약 정보 추가
const addPill = (pill) => {
  return addDoc(collection(dbService, 'pill'), pill);
};

// 약 추가 함수
export const useAddPillData = () => {
  return useMutation(addPill);
};

// 사용자의 약 읽기 함수 / firestore에 사용자의 약 정보 읽기
const getPill = (uid) => {
  const selectedDocs = query(
    collection(dbService, 'pill'),
    where('userId', '==', uid),
  );
  return getDocs(selectedDocs);
};

/**
 * 약 읽기 함수 / 의존성을 갖는 쿼리입니다. 사용자 정보를 먼저 요청해야 사용할 수 있습니다.
 * @param {String} uid useUID custom hook의 반환값을 대입합니다.
 * @returns isLoading, isError, error, data: pillList,
 */
export const useGetPillData = (uid) => {
  return useQuery('pill-list', () => getPill(uid), {
    enabled: !!uid,
    refetchOnWindowFocus: true,
    // TODO: 실시간 업데이트 반영 옵션 활성화하기
    select: (data) => {
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },
  });
};

// 약 isTaken 업데이트 함수 / firestore에 약 복용 정보 업데이트
const toggleTakenPill = ({ id, togglePayload }) => {
  return updateDoc(doc(dbService, 'pill', id), {
    ...togglePayload,
    isTaken: !togglePayload.isTaken,
  });
};

// 약 isTaken 업데이트 함수
export const useToggleTakenPill = () => {
  return useMutation(toggleTakenPill, {
    onSuccess: () => {
      console.log('성공');
    },
    onError: () => {
      console.log('실패');
    },
  });
};

// 약 삭제 함수 / firestore에 새로운 약 정보 삭제
const deletePill = (pill) => {
  return deleteDoc(doc(dbService, 'pill', pill));
};

// 약 삭제 함수
export const useDeletePillData = () => {
  return useMutation(deletePill);
};
