import { View, Text } from 'react-native';
import { dbService } from '../shared/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import styled from '@emotion/native';
import { async } from '@firebase/util';
import { useAddPillData } from '../Hooks/usePill';

function EditPage({ navigation: { navigate } }) {
  const [pillName, setPillName] = useState('');
  const [time, setTime] = useState('');

  const { mutate: addPill, isError, isSuccess } = useAddPillData();

  const newPill = {
    userId: 'ALsTlRugmucb8QA1i8CVMNkSQgR2',
    pillName,
    time,
    isTaken: false,
  };

  const handleAddPill = () => {
    addPill(newPill);
    if (isError) {
      console.log('새로운 약 추가 실패');
    }
    if (isSuccess) {
      console.log(`${pillName} 추가 성공`);
    }
    setPillName('');
    setTime('');
  };

  return (
    <EditPageContainer>
      <EditPageTitle>나의 약 정보</EditPageTitle>
      <EditContents>
        <CustomInput
          placeholder="이름"
          value={pillName}
          onChangeText={setPillName}
        />
        <CustomInput
          placeholder="복용시간"
          value={time}
          onChangeText={setTime}
        />
        <CustomButtonWrapper>
          <CustomButton onPress={handleAddPill} disabled={!pillName || !time}>
            <Text>저장</Text>
          </CustomButton>
          <CustomButton onPress={() => navigate('Tabs', { screen: 'My' })}>
            <Text>취소</Text>
          </CustomButton>
        </CustomButtonWrapper>
      </EditContents>
    </EditPageContainer>
  );
}

export default EditPage;

const EditPageContainer = styled.View``;

const EditPageTitle = styled.Text`
  font-size: 36px;
  font-weight: 600;
`;

const EditContents = styled.View``;

const CustomInput = styled.TextInput`
  background-color: aqua;
  flex-direction: row;
  padding: 16px;
`;

const CustomButtonWrapper = styled.View`
  flex-direction: row;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #0feec6;
  width: 50%;
  padding: 16px;
`;
