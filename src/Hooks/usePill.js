import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Alert } from 'react-native';
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
const addPill = ({ newPill }) => {
  console.log('newPill', newPill);
  return addDoc(collection(dbService, 'pill'), newPill);
};

// 약 추가 함수
export const useAddPillData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPill,
    onMutate: async ({ newPill, navigate }) => {
      // 진행되는 모든 리패치들을 취소합니다.
      await queryClient.cancelQueries({ queryKey: ['pill-list'] });

      // 기존 데이터를 snapshot 찍습니다.
      const previousPillList = queryClient.getQueryData(['pill-list']);

      // 추가 성공 알럿 및 페이지 이동
      Alert.alert('약 추가 성공', '새로운 약 추가를 성공했습니다!', [
        {
          text: '확인',
          onPress: () => navigate('Tabs', { screen: '마이 페이지' }),
        },
      ]);

      // 성공을 가정하고 새로운 값으로 업데이트합니다. // 버그 발생 지점
      // old가 select 처리된 객체배열 데이터가 아니라 쿼리데이터의 전체 객체모임이라 정제 필요했음.
      queryClient.setQueryData(['pill-list'], (old) => {
        const prev = old.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return [...prev, newPill];
      });

      // snapshot 한 값을 context 내부 값으로 반환합니다.
      return { previousPillList };
    },

    // 실패시 onMutate 에서 반환한 리턴값 사용해 처리
    onError: (__err, __newPill, context) => {
      queryClient.setQueryData(['pill-list'], context.previousPillList);
    },

    // 성공이든 실패든 끝나면 항상 리패치합니다.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pill-list'] });
    },
  });
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
    refetchOnMount: true,
  });
};

// 약 isTaken 업데이트 함수 / firestore에 약 복용 정보 업데이트
const toggleTakenPill = ({ id, togglePayload }) => {
  return updateDoc(doc(dbService, 'pill', id), {
    ...togglePayload,
    isTaken: !togglePayload.isTaken,
  });
};

/**
 * 약 isTaken 업데이트 함수
 * 낙관적 업데이트로 캐시를 먼저 업데이트가 되고 서버에 반영되는 패턴입니다.
 * 참고로 캐시가 업데이트 되면서 UI가 업데이트 됩니다.
 * @returns useMutation
 */
export const useToggleTakenPill = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleTakenPill, {
    onMutate: async (togglePill) => {
      // 쿼리를 취소합니다.
      await queryClient.cancelQueries(['pill-list']);

      // 기본 데이터를 저장합니다.
      const previousPillList = queryClient.getQueryData(['pill-list']);

      // 새롭게 변형된 데이터로 설정합니다.
      queryClient.setQueriesData(['pill-list'], (old) => {
        // useGetPillData에서 데이터를 선택하는 것과 유사한 파이어베이한 로직 문제입니다
        old.docs.map((doc) => {
          return doc.id === togglePill.id
            ? // 복용하면서 isTaken을 false에서 true로 변경합니다. 반대도 동작합니다.
              {
                ...doc.data(),
                id: doc.id,
                isTaken: togglePill.togglePayload.isTaken,
              }
            : // 안 건드린 약입니다.
              { ...doc.data(), id: doc.id };
        });

        // 파이어베이스로 선택한 데이터를 반환합니다.
        return old;
      });

      // 저장한 값을 먼저 반환합니다.
      return { previousPillList };
    },

    onSuccess: () => {
      // console.log('성공');
    },

    onError: (__err, __togglePill, context) => {
      // console.log('실패');
      queryClient.setQueryData(['pill-list'], context.previousPillList);
    },

    onSettled: (togglePill) => {
      // 통신 후 서버에 반영합니다.
      queryClient.invalidateQueries(['pill-list']);
    },
  });
};

// 약 수정 함수 / firestore에 약 정보 수정
const EditPill = ({ pillId, newEditPill }) => {
  return updateDoc(doc(dbService, 'pill', pillId), newEditPill);
};

// 약 수정 함수
export const useEditPillData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EditPill,
    onMutate: async ({ newEditPill, pillId, navigate }) => {
      // 진행되는 모든 리패치들을 취소합니다.
      await queryClient.cancelQueries({
        queryKey: ['pill-list', pillId],
      });

      // 기존 데이터를 snapshot 찍습니다.
      const previousPill = queryClient.getQueryData(['pill-list', pillId]);

      // 수정 성공 알럿 및 페이지 이동
      Alert.alert('약 수정 성공', '약 정보 수정을 성공했습니다!', [
        { text: '확인', onPress: navigate('Tabs', { screen: '마이 페이지' }) },
      ]);

      // 성공을 가정하고 새로운 값으로 업데이트합니다.
      queryClient.setQueryData(['pill-list', pillId], newEditPill);

      // 기존값과 새로 업데이트 된 값을 context 내부 값으로 반환합니다.
      return { previousPill, newEditPill };
    },

    // 실패시 onMutate 에서 반환한 리턴값 사용해 처리
    onError: (__err, __newEditPill, context) => {
      queryClient.setQueryData(
        ['pill-list', context.pillId],
        context.previousPill,
      );
    },

    // 성공이든 실패든 끝나면 항상 리패치합니다.
    onSettled: (pillId) => {
      queryClient.invalidateQueries({
        queryKey: ['pill-list', pillId],
      });
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
