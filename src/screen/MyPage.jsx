import styled from '@emotion/native';
import { Text, View, FlatList } from 'react-native';
import { ManageList } from '../components';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';

const MyPage = ({ navigation: { navigate } }) => {
  const { data: uid } = useUID();
  const { isLoading, isError, error, data: pillList } = useGetPillData(uid);

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
      <AddPill
        onPress={() =>
          navigate('Stacks', {
            screen: '수정 페이지',
            params: {
              isEdit: false,
              eachPillName: '',
              eachTime: JSON.stringify(new Date()),
            },
          })
        }
      >
        <Text>약추가</Text>
      </AddPill>
      <FlatList
        data={pillList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, pillName, time } }) => (
          <ManageList
            id={id}
            pillName={pillName}
            time={time}
            navigate={navigate}
          />
        )}
      />
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
