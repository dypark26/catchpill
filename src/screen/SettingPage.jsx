import { CustomButton } from '../components';
import { PageContainer } from '../components/index';

const SettingPage = ({ navigation: { navigate } }) => {
  return (
    <PageContainer>
      <CustomButton
        buttonText="로그아웃"
        onPress={() => navigate('Stacks', { screen: '로그인' })}
      />
      <CustomButton buttonText="다크 모드" />
    </PageContainer>
  );
};

export default SettingPage;
