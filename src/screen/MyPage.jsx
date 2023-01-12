import styled from '@emotion/native';
import { Text, View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { ManageList, CustomButton } from '../components';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';

const MyPage = ({ navigation: { navigate } }) => {
  const { data: uid } = useUID();
  const { isLoading, isError, error, data: pillList } = useGetPillData(uid);

  // 에러 핸들링: 통신 실패의 경우 보여주는 화면입니다.
  if (isError) {
    return (
      <SafeAreaView style={styles.screenArea}>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>에러</Text>
          <Text>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 통신 중
  if (isLoading) {
    return (
      <SafeAreaView style={styles.screenArea}>
        <PageTitle>나의 약관리</PageTitle>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenArea}>
      <PageTitle>나의 약관리</PageTitle>
      <FlatList
        data={pillList}
        ListHeaderComponent={<PageTitle>나의 약관리</PageTitle>}
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
    </SafeAreaView>
  );
};

const PageTitle = styled.Text`
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  margin: 20px 16px;
`;

const CustomButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  margin: -8px 0 16px;
`;

const styles = StyleSheet.create({
  screenArea: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        flex: 1,
        paddingTop: 20,
      },
    }),
  },
});

export default MyPage;
