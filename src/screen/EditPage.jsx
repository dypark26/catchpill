import {
  View,
  Text,
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useContext, useState } from 'react';
import styled from '@emotion/native';
import { useAddPillData, useEditPillData } from '../Hooks/usePill';
import { useUID } from '../Hooks/useAuth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { strToObjTime, translateTime } from '../utils/transTime';
import { CustomButton, BoxShadow, PageContainer } from '../components';
import { ThemeContext } from '../context/Theme';

const EditPage = ({ navigation: { navigate }, route: { params } }) => {
  // '편집'에서 EditPage 들어오면
  // isEdit = true / eachPillName = 약 이름 / eachTime = 복용시간
  // '새로운 약 추가하기'에서 EditPage 들어오면
  // isEdit = false / eachPillName = "" / eachTime = ""
  const { id, isEdit, eachPillName, eachTime } = params;

  const { data: userId } = useUID();
  const [pillName, setPillName] = useState();
  // 1. 처음 약을 추가하는 경우 현재시간 객체값을 초기값으로 넣어준다.
  const [time, setTime] = useState(new Date());
  // 2. 약을 수정하는 경우 eachTime을 가공한 객체값 eachTimeObject를 초기값으로 넣어준다.
  const eachTimeObject = strToObjTime(eachTime);
  const [editTime, setEditTime] = useState(eachTimeObject);

  // flag. 수정여부를 알려주는 state
  const [edited, setEdited] = useState(false);

  // time, editTime 옵션 적용된 문자열 시간값으로 전환
  const localTime = translateTime(time);
  const localEditTime = translateTime(editTime);

  // usePill 커스텀 훅에서 약 추가 / 수정 함수 import
  const { mutate: addPill } = useAddPillData();
  const { mutate: editPill } = useEditPillData();

  // 새로 추가될 약 정보
  const newPill = {
    userId,
    pillName,
    time: JSON.stringify(time),
    isTaken: false,
  };

  // 약 추가 로직
  const handleAddPill = () => {
    addPill({ newPill, navigate });
    setPillName('');
    setTime('');
  };

  // 수정된 약 정보
  let newEditPill = {};
  if (pillName) {
    Object.assign(newEditPill, { pillName: pillName });
  }
  if (time) {
    Object.assign(newEditPill, { time: JSON.stringify(editTime) });
  }

  // 약 편집 로직
  const handleEditPill = () => {
    editPill({ pillId: id, newEditPill, navigate });
  };

  // 타임피커 로직
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onChangeTime = (event, selectedTime) => {
    setTime(selectedTime);
  };

  const onChangeEditTime = (event, selectedTime) => {
    setEditTime(selectedTime);
    setEdited(true);
  };

  const { theme } = useContext(ThemeContext);

  return (
    <PageContainer theme={theme}>
      {/* page 의 title */}
      <EditPageTitle theme={theme}>나의 약 정보</EditPageTitle>
      {/* 수정 폼 */}
      <EditForm>
        {/* 약 이름 인풋 */}
        <BoxShadow color={theme === 'light' ? 'white' : '#343639'}>
          <PillInfoTitle>약 이름 :</PillInfoTitle>
          <PillNameInput
            defaultValue={eachPillName}
            placeholder="어떤 약인가요?"
            value={pillName}
            onChangeText={setPillName}
          />
        </BoxShadow>

        {/* 약 복용시간 타임피커 */}
        <TouchableOpacity onPress={handleOpenModal}>
          <BoxShadow color={theme === 'light' ? 'white' : '#343639'}>
            <PillInfoTitle>복용 시간 :</PillInfoTitle>
            {isEdit ? (
              <TimePicker>{localEditTime}</TimePicker>
            ) : (
              <TimePicker>{localTime}</TimePicker>
            )}
          </BoxShadow>
        </TouchableOpacity>
        {/* 에디트 폼 버튼 래퍼 */}
        <CustomButtonWrapper>
          {/* 약 추가/저장 버튼 */}
          {isEdit ? (
            <CustomButton
              onPress={handleEditPill}
              disabled={!pillName && !edited}
              buttonText="수정"
            />
          ) : (
            <CustomButton
              onPress={handleAddPill}
              disabled={!pillName || !time}
              buttonText="저장"
            />
          )}
          {/* 취소 / 돌아가기 버튼 */}
          <CustomButton
            title="delete"
            onPress={() => navigate('Tabs', { screen: '마이 페이지' })}
            buttonText="취소"
          >
            <Text>취소</Text>
          </CustomButton>
        </CustomButtonWrapper>
      </EditForm>
      <Modal visible={isOpenModal} transparent animationType="slide">
        <Backdrop>
          <ModalCard>
            {isEdit ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={editTime}
                mode={'time'}
                is24Hour={true}
                display="spinner"
                onChange={onChangeEditTime}
              />
            ) : (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                display="spinner"
                onChange={onChangeTime}
              />
            )}
            <Button
              title="확인"
              onPress={() => {
                setIsOpenModal(false);
              }}
            />
          </ModalCard>
        </Backdrop>
      </Modal>
    </PageContainer>
  );
};

export default EditPage;

// 로컬 디바이스 화면크기 가져오기
const windowHeight = Dimensions.get('window').height;

const EditPageTitle = styled.Text`
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  margin: 20px 16px;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const EditForm = styled.View``;

const PillNameInput = styled.TextInput`
  font-size: 28px;
  flex-direction: row;
`;

const TimePicker = styled.Text`
  font-size: 28px;
  flex-direction: row;
`;

const PillInfoContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PillInfoTitle = styled.Text`
  font-size: 28px;
  text-overflow: ellipsis;
`;

const CustomButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin: -8px 16px 0px;
`;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.KeyboardAvoidingView`
  width: 80%;
  height: 40%;
  padding: 16px;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
  background-color: white;
`;
