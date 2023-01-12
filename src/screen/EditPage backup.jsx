// import {
//   Text,
//   Alert,
//   Modal,
//   Button,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { useState } from 'react';
// import styled from '@emotion/native';
// import { useAddPillData, useEditPillData } from '../Hooks/usePill';
// import { COLORS } from '../shared/color';
// import { useUID } from '../Hooks/useAuth';
// import DateTimePicker from '@react-native-community/datetimepicker';

// function EditPage({ navigation: { navigate }, route: { params } }) {
//   // '편집'에서 EditPage 들어오면
//   // isEdit = true / eachPillName = 약 이름 / eachTime = 복용시간
//   // '새로운 약 추가하기'에서 EditPage 들어오면
//   // isEdit = false / eachPillName = "" / eachTime = ""
//   const { id, isEdit, eachPillName, eachTime } = params;

//   const { data: userId } = useUID();

//   const [pillName, setPillName] = useState();
//   const [time, setTime] = useState(new Date(1598051730000));
//   const [editTime, setEditTime] = useState(eachPickerTimeStamp);

//   // 타임스탬프 > 로컬타임
//   // const options = { hour: 'numeric', minute: '2-digit' };
//   // const pickerTime = time.toLocaleString('en-KR', options);
//   // console.log('pickerTime', pickerTime);

//   // 로컬타임 > 타임스탬프

//   //   Copied!

//   // const dateStr = '06/24/2022 09:30:05';

//   // const [dateRelated, timeRelated] = dateStr.split(' ');
//   // console.log(dateRelated); // 👉️ "06/24/2022"
//   // console.log(timeRelated); // 👉️ "09:30:05"

//   // const [month, day, year] = dateRelated.split('/');
//   // const [hours, minutes, seconds] = timeRelated.split(':');

//   // const date2 = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
//   // console.log(date2); // 👉️ Fri Jun 24 2022 09:30:05

//   // // 👇️ Get timestamp
//   // const timestamp = date2.getTime();

//   const [hours, minutes] = eachTime.slice(0, -3).split(':');
//   const eachPickerTime = new Date(+hours, +minutes);
//   const eachPickerTimeStamp = eachPickerTime.getTime();
//   console.log('eachPickerTimeStamp', eachTime, eachPickerTimeStamp);
//   // console.log('eachTime', eachTime);

//   // usePill 커스텀 훅에서 약 추가 / 수정 함수 import
//   const { mutate: addPill } = useAddPillData();
//   const { mutate: editPill } = useEditPillData();

//   // 새로 추가될 약 정보
//   const newPill = {
//     userId,
//     pillName,
//     time: pickerTime,
//     // time: time.toString(),
//     // time: time.toJSON(),
//     // time: JSON.stringify(time),
//     isTaken: false,
//   };

//   // 약 추가 로직
//   const handleAddPill = () => {
//     addPill({ newPill, navigate });
//     setPillName('');
//     setTime('');
//   };

//   // 수정된 약 정보
//   let newEditPill = {};
//   if (pillName) {
//     Object.assign(newEditPill, { pillName: pillName });
//   }
//   if (time) {
//     Object.assign(newEditPill, { time: time });
//   }

//   // 약 편집 로직
//   const handleEditPill = () => {
//     editPill({ pillId: id, newEditPill, navigate });
//   };

//   // 타임피커 로직
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setIsOpenModal(true);
//   };

//   const onChangeTime = (event, selectedTime) => {
//     setTime(selectedTime);
//     console.log('type', typeof selectedTime);
//   };

//   const onChangeEditTime = (event, selectedTime) => {
//     setEditTime(selectedTime);
//     console.log('type', typeof selectedTime);
//   };

//   return (
//     <EditPageContainer>
//       {/* page 의 title */}
//       <EditPageTitle>나의 약 정보</EditPageTitle>
//       {/* 수정 폼 */}
//       <EditForm>
//         {/* 약 이름 인풋 */}
//         <PillInfoContainer>
//           <PillInfoTitle>약 이름 :</PillInfoTitle>
//           <PillNameInput
//             defaultValue={eachPillName}
//             placeholder="어떤 약인가요?"
//             value={pillName}
//             onChangeText={setPillName}
//           />
//         </PillInfoContainer>
//         {/* 약 복용시간 타임피커 */}
//         <TouchableOpacity onPress={handleOpenModal}>
//           <PillInfoContainer>
//             <PillInfoTitle>복용 시간 :</PillInfoTitle>
//             {isEdit ? (
//               <TimePicker>{eachTime}</TimePicker>
//             ) : (
//               <TimePicker>{pickerTime}</TimePicker>
//             )}
//           </PillInfoContainer>
//         </TouchableOpacity>
//         {/* 에디트 폼 버튼 래퍼 */}
//         <CustomButtonWrapper>
//           {/* 약 추가/저장 버튼 */}
//           {isEdit ? (
//             <CustomButton
//               onPress={handleEditPill}
//               disabled={!pillName && !time}
//             >
//               <Text>수정</Text>
//             </CustomButton>
//           ) : (
//             <CustomButton onPress={handleAddPill} disabled={!pillName || !time}>
//               <Text>저장</Text>
//             </CustomButton>
//           )}
//           {/* 취소 / 돌아가기 버튼 */}
//           <CustomButton
//             onPress={() => navigate('Tabs', { screen: '마이 페이지' })}
//           >
//             <Text>취소</Text>
//           </CustomButton>
//         </CustomButtonWrapper>
//       </EditForm>
//       <Modal visible={isOpenModal} transparent animationType="slide">
//         <Backdrop>
//           <ModalCard>
//             {isEdit ? (
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={editTime}
//                 mode={'time'}
//                 is24Hour={true}
//                 display="spinner"
//                 onChange={onChangeEditTime}
//               />
//             ) : (
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={time}
//                 mode={'time'}
//                 is24Hour={true}
//                 display="spinner"
//                 onChange={onChangeTime}
//               />
//             )}
//             <Button
//               title="확인"
//               onPress={() => {
//                 setIsOpenModal(false);
//               }}
//             />
//           </ModalCard>
//         </Backdrop>
//       </Modal>
//     </EditPageContainer>
//   );
// }

// export default EditPage;

// // 로컬 디바이스 화면크기 가져오기
// const windowHeight = Dimensions.get('window').height;

// const EditPageContainer = styled.View`
//   flex: 1;
//   height: ${windowHeight};
// `;

// const EditPageTitle = styled.Text`
//   font-size: 36px;
//   font-weight: 600;
// `;

// const EditForm = styled.View``;

// const PillNameInput = styled.TextInput`
//   font-size: 28px;
//   flex-direction: row;
// `;

// const TimePicker = styled.Text`
//   font-size: 28px;
//   flex-direction: row;
// `;

// const PillInfoContainer = styled.View`
//   background-color: white;
//   margin: 8px 16px;
//   padding: 12px 16px;
//   height: 80px;
//   border-radius: 16px;
//   box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const PillInfoTitle = styled.Text`
//   font-size: 28px;
//   text-overflow: ellipsis;
// `;

// const CustomButtonWrapper = styled.View`
//   width: 100%;
//   flex-direction: row;
// `;

// const CustomButton = styled.TouchableOpacity`
//   background-color: ${(props) =>
//     props.disabled ? COLORS.POINT_COLOR_20 : COLORS.POINT_COLOR_100};
//   flex: 1;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 16px;
// `;

// const Backdrop = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalCard = styled.KeyboardAvoidingView`
//   width: 80%;
//   height: 40%;
//   padding: 16px;
//   justify-content: space-between;
//   border-radius: 16px;
//   box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
//   background-color: white;
// `;
