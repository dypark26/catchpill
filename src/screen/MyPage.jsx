import styled from '@emotion/native';
import { ScrollView, Text, View } from 'react-native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getDocs,
  query,
  collection,
  orderBy,
  where,
  doc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { dbService, authService } from '../shared/firebase';
import { getAuth } from 'firebase/auth';
import { ManageList } from '../components';

const adminInfo = {
  id: 'catchPillAdmin@email.com',
  pw: '123456',
};
// { navigation: { navigate } }
const MyPage = ({ navigation: { navigate } }) => {
  // 회원가입입니다.
  const handlesSignUp = (id, pw) => {
    return createUserWithEmailAndPassword(
      authService,
      adminInfo.id,
      adminInfo.pw,
    );
  };

  useMutation(() => handlesSignUp(id, pw));

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

  // 기존 로직
  // 의존적 쿼리입니다. 사용자의 UID를 얻은 후에 통신이 가능합니다.
  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: pillList,
  // } = useQuery('pill-list', () => getUsersPillList(uid), {
  //   enabled: !!uid,
  //   select: (data) => {
  //     return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //   },
  // });

  // const renderPillList = pillList?.map(({ id, pillName }) => (
  //   <ManageList key={id} id={id} pillName={pillName} />
  // ));

  // 임시 로직
  const sampleUid = 'ALsTlRugmucb8QA1i8CVMNkSQgR2';
  const {
    isLoading,
    isError,
    error,
    data: pillList,
  } = useQuery('pill-list', () => getUsersPillList(sampleUid), {
    enabled: !!sampleUid,
    select: (data) => {
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },
  });

  const renderPillList = pillList?.map(({ id, pillName, time }) => (
    <ManageList
      key={id}
      id={id}
      pillName={pillName}
      time={time}
      navigate={navigate}
    />
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
      <AddPill onPress={() => handleLogin()}>
        <Text>임시 로그인</Text>
      </AddPill>
      <ScrollView>{renderPillList}</ScrollView>
      <AddPill
        onPress={() =>
          navigate('Stacks', {
            screen: '수정 페이지',
            params: { isEdit: false, eachPillName: '', eachTime: '' },
          })
        }
      >
        <Text>약추가</Text>
      </AddPill>
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
