import { View, Text, TouchableOpacity } from 'react-native';

const MyPage = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate('Stacks', { screen: '수정 페이지' })}
      >
        <Text>수정 페이지로</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('Stacks', { screen: '로그인' })}
      >
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPage;
