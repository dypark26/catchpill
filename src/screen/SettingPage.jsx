import { TextButton } from '../components';
import { View } from 'react-native';

const SettingPage = () => {
  return (
    <View>
      <TextButton buttonColor="aqua" buttonText="로그아웃" />
      <TextButton buttonColor="aqua" buttonText="다크 모드" />
    </View>
  );
};

export default SettingPage;
