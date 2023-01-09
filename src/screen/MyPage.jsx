import styled from '@emotion/native';
import { Text, View } from 'react-native';
import { ManageList } from '../components';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';

const adminInfo = {
  id: 'catchPillAdmin@email.com',
  pw: '123456',
};

const MyPage = ({ navigation: { navigate } }) => {
  const { data: uid } = useUID();
  const { isLoading, isError, error, data: pillList } = useGetPillData(uid);

  const renderPillList = pillList?.map(({ id, pillName }) => (
    <ManageList key={id} id={id} pillName={pillName} />
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
      <AddPill onPress={() => navigate('Stacks', { screen: '수정 페이지' })}>
        <Text>약추가</Text>
      </AddPill>
      {renderPillList}
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
