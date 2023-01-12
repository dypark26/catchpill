import {
  Text,
  Alert,
  Modal,
  Button,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import styled from '@emotion/native';
import { useAddPillData, useEditPillData } from '../Hooks/usePill';
import { COLORS } from '../shared/color';
import { useUID } from '../Hooks/useAuth';
import DateTimePicker from '@react-native-community/datetimepicker';

function EditPage({ navigation: { navigate }, route: { params } }) {
  // '편집'에서 EditPage 들어오면
  // isEdit = true / eachPillName = 약 이름 / eachTime = 복용시간
  // '새로운 약 추가하기'에서 EditPage 들어오면
  // isEdit = false / eachPillName = "" / eachTime = ""
  const { id, isEdit, eachPillName, eachTime } = params;

  const { data: userId } = useUID();
  const [pillName, setPillName] = useState();

  // // 객체에서 문자열으로!
  // console.log('currentTime', new Date()); // new Date() 는 현재시각
  // // currentTime 2023-01-11T18:26:15.788Z (객체)
  // console.log('currentTimeString', JSON.stringify(new Date())); // 현재시각을 문자화하면
  // // currentTimeString "2023-01-11T18:26:15.789Z" (문자열)
  // console.log('time', time); // new Date()를 받아오는 객체 time 과 똑같은 모양의 문자열이 된다.
  // // time 2023-01-11T18:26:15.703Z (객체)

  // // 문자열에서 객체로!
  // const initialTime = '09/24/2022 07:30:14'; // 기본값이 될 문자열 날짜
  // const [dateValues, timeValues] = initialTime.split(' '); // 문자열 날짜를 쪼개서
  // console.log(dateValues); // "09/24/2022"
  // console.log(timeValues); // "07:30:14"

  // const [month, day, year] = dateValues.split('/');
  // const [hours, minutes, seconds] = timeValues.split(':');
  // const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds); // new Date() 에 할당해주면,

  // console.log('date', date); // 2022-09-23T22:30:14.000Z
  // console.log('date type', typeof date); // date type object // 문자열 initialTime을 객체로 바꾼 값이 된다.

  // 타임피커 로직
  // 1. 처음 약을 추가하는 경우
  // 현재시간을 기본값인 currentTime에 변수할당한다.
  const [time, setTime] = useState(new Date());
  // 저장을 누르면, time 을 문자열화 한 값을 새로 추가할 약 정보 중 복용시간(time)으로 보낸다.
  // time: JSON.stringify(time),
  console.log('time', time);
  // time 2023-01-11T18:58:08.849Z // 오전 3:59
  console.log('stringify-time', JSON.stringify(time));
  // stringify-time "2023-01-11T18:58:08.849Z"

  // 2. 약을 수정하는 경우
  // 기존의 문자열 시간값 eachTime을 가져와서 가공하여 만든 객체값인 eachTimeObject으로 반환한다.
  console.log('eachTime', eachTime); // eachTime "2023-01-11T23:12:15.000Z"
  // eachTime "2023-01-12T09:30:53.000Z"(6:30 PM)
  // eachTime "2023-01-12T01:00:25.000Z" (10:00 AM)
  // eachTime "2023-01-12T02:00:34.000Z" (11:00 AM)
  // eachTime "2023-01-11T23:59:32.000Z" (8:59 AM)

  // 날짜 쪼개기
  const [dateValues, timeValues] = eachTime.split('T');
  console.log('dateValues', dateValues.substr(1)); // dateValues 2023-01-12
  console.log('timeValues', timeValues.substr(0, 8)); // timeValues 09:30:53
  const [year, month, day] = dateValues.substr(1).split('-');
  const [hours, minutes, seconds] = timeValues.substr(0, 8).split(':');
  console.log(year, month, day, hours, minutes, seconds); // 2023 01 12 09 30 53

  // eachTimeObject
  const eachTimeObject = new Date(
    +year,
    +month - 1,
    +day + 1,
    +hours - 15,
    +minutes,
    +seconds,
  );

  // eachTime과 editTime 비교
  console.log('eachTime', eachTime);
  console.log('eachTimeObject', eachTimeObject);

  const [editTime, setEditTime] = useState(eachTimeObject);

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

  // 시간 표시 옵션
  const options = { hour: 'numeric', minute: '2-digit' };
  // const [editTime, setEditTime] = useState(eachTime);
  // console.log('time', time);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onChangeTime = (event, selectedTime) => {
    setTime(selectedTime);
  };

  const onChangeEditTime = (event, selectedTime) => {
    setEditTime(selectedTime);
  };

  return (
    <EditPageContainer>
      {/* page 의 title */}
      <EditPageTitle>나의 약 정보</EditPageTitle>
      {/* 수정 폼 */}
      <EditForm>
        {/* 약 이름 인풋 */}
        <PillInfoContainer>
          <PillInfoTitle>약 이름 :</PillInfoTitle>
          <PillNameInput
            defaultValue={eachPillName}
            placeholder="어떤 약인가요?"
            value={pillName}
            onChangeText={setPillName}
          />
        </PillInfoContainer>
        {/* 약 복용시간 타임피커 */}
        <TouchableOpacity onPress={handleOpenModal}>
          <PillInfoContainer>
            <PillInfoTitle>복용 시간 :</PillInfoTitle>
            {/* <TimePicker>{time.toLocaleString()}</TimePicker> */}
            {isEdit ? (
              <TimePicker>
                {editTime.toLocaleString('en-KR', options)}
              </TimePicker>
            ) : (
              <TimePicker>{time.toLocaleString('en-KR', options)}</TimePicker>
            )}
          </PillInfoContainer>
        </TouchableOpacity>
        {/* 에디트 폼 버튼 래퍼 */}
        <CustomButtonWrapper>
          {/* 약 추가/저장 버튼 */}
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
    </EditPageContainer>
  );
}

export default EditPage;

// 로컬 디바이스 화면크기 가져오기
const windowHeight = Dimensions.get('window').height;

const EditPageContainer = styled.View`
  flex: 1;
  height: ${windowHeight};
`;

const EditPageTitle = styled.Text`
  font-size: 36px;
  font-weight: 600;
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
  background-color: white;
  margin: 8px 16px;
  padding: 12px 16px;
  height: 80px;
  border-radius: 16px;
  box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
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
`;

const CustomButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled ? COLORS.POINT_COLOR_20 : COLORS.POINT_COLOR_100};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
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
