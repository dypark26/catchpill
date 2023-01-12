import { GraphicStatus } from '../components/index';
import { Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';
import { ToggleList } from '../components';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const { data: uid } = useUID();
  const { isError, error, isLoading, data: pillList } = useGetPillData(uid);

  /**
   * 처음에는 uid의 값은 undefined입니다. 값을 할당하고 나서 리랜더링을 합니다. 리랜더링을 만들기 위해 useState를 사용합니다.
   * 리랜더링을 통해 의존성 쿼리 패턴을 유지합니다. 최초 1회만 실행하기 위해 의존성 배열은 비웁니다.
   * 예시 영상을 만들 때 본인 인터넷 환경에 따라 맞게 setTimeout 시간을 변경하기 바랍니다. uid를 가져오기 위해 더 많은 시간이 필요하면 길게 바꿉니다.
   */
  const [initialLoad, setInitialLoad] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(1);
    }, 2000);
  }, []);

  if (isError) {
    return (
      <SafeAreaView style={styles.screenArea}>
        <Text>에러 페이지</Text>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }

  if (isLoading || !initialLoad) {
    return (
      <SafeAreaView style={styles.screenArea}>
        <Text>로딩 화면</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenArea}>
      <FlatList
        data={pillList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<GraphicStatus />}
        renderItem={({ item: { pillName, id, time, isTaken } }) => (
          <ToggleList
            pillName={pillName}
            id={id}
            time={time}
            isTaken={isTaken}
            uid={uid}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  screenArea: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: 'white',
      },
      android: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
      },
    }),
  },
});
