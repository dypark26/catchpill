import { GraphicStatus } from '../components/index';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';
import { ToggleList } from '../components';

const MainPage = ({ navigation: { navigate } }) => {
  const { data: uid } = useUID();
  const { isError, error, isLoading, data: pillList } = useGetPillData(uid);

  if (isError) {
    return (
      <View>
        <Text>에러 페이지</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>로딩 화면</Text>
      </View>
    );
  }

  return (
    <View>
      <GraphicStatus />
      <TouchableOpacity
        onPress={() => navigate('Stacks', { screen: '로그인' })}
      >
        <Text>로그아웃</Text>
      </TouchableOpacity>
      {/* GraphicStatus가 들어오는 자리 */}
      <FlatList
        data={pillList}
        keyExtractor={(item) => item.id}
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
    </View>
  );
};

export default MainPage;
