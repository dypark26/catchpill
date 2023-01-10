import { View, Text, TouchableOpacity } from 'react-native';
import { GraphicStatus } from '../components/index';

const MainPage = ({ navigation: { navigate } }) => {
  return (
    <View>
      <GraphicStatus />
      <TouchableOpacity
        onPress={() => navigate('Stacks', { screen: '로그인' })}
      >
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPage;
