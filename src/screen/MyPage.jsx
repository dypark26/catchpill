import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getDocs,
  onSnapshot,
  addDoc,
  query,
  collection,
  orderBy,
  where,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { dbService, authService } from '../shared/firebase';
import { getAuth } from 'firebase/auth';
import { v4 as uuid } from 'uuid';
import { ManageList } from '../components';

const adminInfo = {
  id: 'catchPillAdmin@email.com',
  pw: '123456',
};

const MyPage = () => {
  // 회원가입입니다.
  const handlesSignUp = () => {
    createUserWithEmailAndPassword(authService, adminInfo.id, adminInfo.pw)
      .then((userData) => console.log(userData.user))
      .catch((error) => {
        const errorMessage = error.message;
        console.log('회원가입 실패', errorMessage);
      });
  };

  // 로그인입니다.
  const handleLogin = () => {
    signInWithEmailAndPassword(authService, adminInfo.id, adminInfo.pw)
      .then(() => {
        console.log('로그인 성공');
      })
      .catch((error) => {
        console.log('로그인 실패', error.errorMessage);
      });
  };

  // TODO: 쿼리키 통일하기
  // UID를 조회합니다.
  const getUID = () => {
    return getAuth();
  };

  const { data: uid } = useQuery('uid', getUID, {
    select: (data) => {
      return data?.currentUser?.uid;
    },
  });

  // read users pill
  const getUsersPillList = (uid) => {
    const selectedDocs = query(
      collection(dbService, 'pill'),
      where('userId', '==', uid),
    );
    return getDocs(selectedDocs);
  };

  // 의존적 쿼리입니다. 사용자의 UID를 얻은 후에 통신이 가능합니다.
  const {
    isLoading,
    isError,
    error,
    data: pillList,
  } = useQuery('pill-list', () => getUsersPillList(uid), {
    enabled: !!uid,
    select: (data) => {
      return data.docs.map((doc) => {
        // console.log('doc', doc);
        return {
          id: doc.id,
          userId: doc?.data()?.userId,
          pillName: doc?.data()?.pillName,
          time: doc?.data()?.time,
          isTaken: doc?.data()?.isTaken,
        };
      });
    },
  });

  const queryClient = useQueryClient();

  // 새로운 약 목록을 추가하는 Mutation 함수입니다.
  const postNewPill = (newPill) => {
    const selectedDoc = collection(dbService, 'pill');
    return addDoc(selectedDoc, newPill);
  };

  // console.log('getUid', uid);

  const newPill = {
    // id: uuid(),
    userId: uid,
    pillName: '점심약',
    time: '12:00',
    isTaken: false,
  };

  const { mutate: addPill } = useMutation(() => postNewPill(newPill), {
    onMutate: async () => {
      // 재요청으로 인한 덮어쓰기를 막습니다.
      await queryClient.cancelQueries('pill-list');
      const previousPillData = queryClient.getQueryData('pill-list');
      queryClient.setQueriesData('pill-list', (oldPillData) => {
        return { ...oldPillData, docs: [...oldPillData?.docs, newPill] };
      });
      return { previousPillData };
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData('pill-list', context.previousPillData);
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
    onSettled: () => {
      // 클라이언트 상태가 서버 상태랑 동일하게 싱크를 맞추어줍니다.
      queryClient.invalidateQueries('pill-list');
    },
  });

  const renderPillList = pillList?.map(({ id, pillName }) => (
    <ManageList key={id} id={id} pillName={pillName} />
  ));

  // 에러 핸들링: 통신 실패의 경우 보여주는 화면입니다.
  // if (isError) {
  //   return (
  //     <MyPageContainer>
  //       <PageTitle>나의 약관리</PageTitle>
  //       <View>
  //         <Text>에러</Text>
  //         <Text>{error.errorMessage}</Text>
  //       </View>
  //     </MyPageContainer>
  //   );
  // }

  // 통신 중
  if (isLoading) {
    return (
      <MyPageContainer>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>Loading...</Text>
        </View>
      </MyPageContainer>
    );
  }

  return (
    <MyPageContainer>
      <PageTitle>나의 약관리</PageTitle>
      {/* TODO: flatList 컴포넌트로 리팩토링하기 */}
      <AddPill onPress={() => handleLogin()}>
        <Text>임시 로그인</Text>
      </AddPill>
      <AddPill onPress={() => addPill(newPill)}>
        <Text>약추가</Text>
      </AddPill>
      {renderPillList}
      {/* TODO: 하단 tabs */}
    </MyPageContainer>
  );
};

const MyPageContainer = styled.SafeAreaView`
  flex: 1;
`;

const PageTitle = styled.Text`
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  margin: 20px 16px;
`;

const AddPill = styled.TouchableOpacity`
  background-color: #f8f8f8;
  margin: 8px 16px;
  height: 80px;
  border-radius: 16px;
`;

export default MyPage;
