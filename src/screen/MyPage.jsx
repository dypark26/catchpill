import styled from '@emotion/native';
import { Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { ManageList, CustomButton } from '../components';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';
import { PageContainer } from '../components/index';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

const MyPage = ({ navigation: { navigate } }) => {
  const { data: uid } = useUID();
  const { isLoading, isError, error, data: pillList } = useGetPillData(uid);
  const { theme } = useContext(ThemeContext);

  // 에러 핸들링: 통신 실패의 경우 보여주는 화면입니다.
  if (isError) {
    return (
      <PageContainer>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>에러</Text>
          <Text>{error.message}</Text>
        </View>
      </PageContainer>
    );
  }

  // 통신 중
  if (isLoading) {
    return (
      <PageContainer>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>Loading...</Text>
        </View>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FlatList
        data={pillList}
        ListHeaderComponent={<PageTitle theme={theme}>나의 약관리</PageTitle>}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, pillName, time } }) => (
          <ManageList
            id={id}
            pillName={pillName}
            time={time}
            navigate={navigate}
          />
        )}
        ListFooterComponent={
          <CustomButtonContainer>
            <CustomButton
              title="Login"
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
              buttonText="새로운 약 추가하기"
            />
          </CustomButtonContainer>
        }
      />
    </PageContainer>
  );
};

const MyPageContainer = styled.SafeAreaView`
  flex: 1;
  /* background-color: ${(props) =>
    props.theme === 'light' ? 'white' : 'black'}; */
`;

const PageTitle = styled.Text`
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  margin: 20px 16px;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const CustomButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  margin: -8px 8px 0px;
`;

export default MyPage;
