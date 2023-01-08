import styled from '@emotion/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery, useMutation } from 'react-query';
import {
  getDocs,
  addDoc,
  deleteDoc,
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
import { COLORS } from '../shared/color';

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

  // TODO: 파이어 베이스 초대 받으면 문서 이름 알아내기
  // const q = query(collection(dbService, ''), orderBy(''));

  const newPill = {
    id: uuid(),
    userId: uid,
    pillName: '아침약',
    time: '08:00',
    isTaken: false,
  };

  // /pill
  const addPill = (newPill) => {
    const selectedDoc = query(collection(dbService, 'pill'));
    addDoc(selectedDoc, newPill)
      .then(() => {
        console.log('추가 성공');
      })
      .catch((error) => console.log('error', error.errorMessage));
  };

  // TODO: 쿼리키 통일하기
  // UID를 조회합니다.
  const getUID = () => {
    return getAuth();
  };
  const { data: uid } = useQuery('uid', getUID, {
    select: (data) => {
      return data.currentUser.uid;
    },
  });
  console.log('getUid', uid);

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
    select: (data) => data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });

  const renderPillList = pillList?.map((pillListItem) => (
    <ManageListContainer>
      <ManageListTitle>{pillListItem.pillName}</ManageListTitle>
      <ButtonGroupContainer>
        <TouchableOpacity>
          <ManageButton buttonColor={COLORS.BLACK}>편집</ManageButton>
        </TouchableOpacity>
        <TouchableOpacity>
          <ManageButton buttonColor={COLORS.DANGER}>삭제</ManageButton>
        </TouchableOpacity>
      </ButtonGroupContainer>
    </ManageListContainer>
  ));

  // 에러 핸들링: 통신 실패의 경우 보여주는 화면입니다.
  if (isError) {
    return (
      <MyPageContainer>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>에러</Text>
          <Text>{error.errorMessage}</Text>
        </View>
      </MyPageContainer>
    );
  }

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
      <AddPill onPress={() => console.log('add Pill')}>
        <Text>새로운 약 추가하기</Text>
      </AddPill>
      <AddPill onPress={() => handleLogin()}>
        <Text>임시 회원가입</Text>
      </AddPill>
      <AddPill onPress={() => addPill(newPill)}>
        <Text>약추가</Text>
      </AddPill>
      {/* 약추가 */}
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

const ManageListContainer = styled.View`
  background-color: white;
  margin: 8px 16px;
  padding: 12px 16px;
  height: 80px;
  border-radius: 16px;
  box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ManageListTitle = styled.Text`
  font-size: 28px;
`;

const ButtonGroupContainer = styled.View`
  flex-direction: row;
  justify-content: end;
  gap: 16px;
`;

const ManageButton = styled.Text`
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 0 16px;
  color: ${(props) => props.buttonColor};
`;

export default MyPage;
