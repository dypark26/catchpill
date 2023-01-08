import { View, Text, TouchableOpacity } from 'react-native';

const EditPage = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate('Tabs', { screen: '마이 페이지' })}
      >
        <Text>마이 페이지로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPage;
