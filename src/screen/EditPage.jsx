import { Text, Alert } from 'react-native';
import { useState } from 'react';
import styled from '@emotion/native';
import { useAddPillData, useEditPillData } from '../Hooks/usePill';
import { COLORS } from '../shared/color';
import { useUID } from '../Hooks/useAuth';

function EditPage({ navigation: { navigate }, route: { params } }) {
  // '편집'에서 EditPage 들어오면
  // isEdit = true / eachPillName = 약 이름 / eachTime = 복용시간
  // '새로운 약 추가하기'에서 EditPage 들어오면
  // isEdit = false / eachPillName = "" / eachTime = ""
  const { id, isEdit, eachPillName, eachTime } = params;
  const { data: userId } = useUID();

  const [pillName, setPillName] = useState();
  const [time, setTime] = useState();

  // usePill 커스텀 훅에서 약 추가 함수 import
  const { mutate: addPill, isError, isSuccess } = useAddPillData();

  // 새로 추가될 약 정보
  const newPill = {
    userId,
    pillName,
    time,
    isTaken: false,
  };

  // 약 추가 로직
  const handleAddPill = () => {
    addPill({ newPill, navigate });
    if (isError) {
      console.log('새로운 약 추가 실패');
    }
    if (isSuccess) {
      console.log(`${pillName} 추가 성공`);
      ``;
    }
    setPillName('');
    setTime('');
  };

  const { mutate: editPill } = useEditPillData();

  // 수정된 약 정보
  let newEditPill = {};
  if (pillName) {
    Object.assign(newEditPill, { pillName: pillName });
  }
  if (time) {
    Object.assign(newEditPill, { time: time });
  }

  // 약 편집 로직
  const handleEditPill = () => {
    editPill({ pillId: id, newEditPill });
    console.log('약 수정 성공!');

    if (isError) {
      console.log('약 수정 실패');
    }
    if (isSuccess) {
      console.log(`${pillName} 수정 성공`);
      ``;
    }
    Alert.alert('약 수정 성공', '약 정보 수정을 성공했습니다!', [
      { text: '확인', onPress: navigate('Tabs', { screen: '마이 페이지' }) },
    ]);
  };

  return (
    <EditPageContainer>
      {/* page 의 title */}
      <EditPageTitle>나의 약 정보</EditPageTitle>
      {/* 수정 폼 */}
      <EditForm>
        {/* 약 이름 인풋 */}
        <CustomInput
          defaultValue={eachPillName}
          placeholder="이름"
          value={pillName}
          onChangeText={setPillName}
        />
        {/* 약 복용시간 인풋 */}
        <CustomInput
          defaultValue={eachTime}
          placeholder="복용시간"
          value={time}
          onChangeText={setTime}
        />
        <CustomButtonWrapper>
          {/* 약 추가/저장 버튼 */}
          {/* 커스텀 버튼 완료시 children 값 변경하기 : Add 일때는 '추가' Edit 일때는 '저장'으로 */}
          {isEdit ? (
            <CustomButton
              onPress={handleEditPill}
              disabled={!pillName && !time}
            >
              <Text>수정</Text>
            </CustomButton>
          ) : (
            <CustomButton onPress={handleAddPill} disabled={!pillName || !time}>
              <Text>저장</Text>
            </CustomButton>
          )}
          {/* 취소 / 돌아가기 버튼 */}
          <CustomButton
            onPress={() => navigate('Tabs', { screen: '마이 페이지' })}
          >
            <Text>취소</Text>
          </CustomButton>
        </CustomButtonWrapper>
      </EditForm>
    </EditPageContainer>
  );
}

export default EditPage;

const EditPageContainer = styled.View``;

const EditPageTitle = styled.Text`
  font-size: 36px;
  font-weight: 600;
`;

const EditForm = styled.View``;

const CustomInput = styled.TextInput`
  background-color: aqua;
  flex-direction: row;
  padding: 16px;
`;

const CustomButtonWrapper = styled.View`
  flex-direction: row;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? COLORS.POINT_COLOR_20 : COLORS.POINT_COLOR_100};
  width: 50%;
  padding: 16px;
`;
