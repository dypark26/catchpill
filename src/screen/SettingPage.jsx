import { useContext } from 'react';
import { ThemeContext, ToggleModeButton } from '../context/Theme';
import { CustomButton, PageContainer } from '../components/';
import styled from '@emotion/native';

const SettingPage = ({ navigation: { navigate } }) => {
  return (
    <PageContainer>
      <CustomButtonWrapper>
        <CustomButton
          title="Login"
          buttonText="로그아웃"
          onPress={() => navigate('Stacks', { screen: '로그인' })}
        />
        <ToggleModeButton
          title="Login"
          buttonColor="aqua"
          buttonText="다크 모드"
        />
      </CustomButtonWrapper>
    </PageContainer>
  );
};

export default SettingPage;

const CustomButtonWrapper = styled.View`
  margin: -8px 16px 0px;
`;
