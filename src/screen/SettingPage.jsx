import { CustomButton } from '../components';
import { View, SafeAreaView, StyleSheet } from 'react-native';

const SettingPage = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={styles.screenArea}>
      <CustomButton
        buttonText="로그아웃"
        onPress={() => navigate('Stacks', { screen: '로그인' })}
      />
      <CustomButton buttonText="다크 모드" />
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  screenArea: {
    ...Platform.select({
      android: {
        paddingTop: 30,
      },
    }),
  },
});
