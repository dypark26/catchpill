import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from '@emotion/native';

const MyPage = ({ navigation: { navigate } }) => {
  return (
    <MyPageContainer>
      {/* page 의 title */}
      <MyPageTitle>나의 약 관리</MyPageTitle>
      {/* 약 리스트 */}
      <ManageList>
        <PillCard>
          <Text>아침약</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text>편집</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        </PillCard>
      </ManageList>
      {/* 약 추가 버튼 */}
      <CustomButton onPress={() => navigate('Stacks', { screen: 'EditPage' })}>
        <Text>새로운 약 추가하기</Text>
      </CustomButton>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.View``;

const MyPageTitle = styled.Text`
  font-size: 36px;
  font-weight: 600;
`;

const ManageList = styled.ScrollView``;

const PillCard = styled.View`
  background-color: aqua;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #0feec6;
  padding: 16px;
`;
