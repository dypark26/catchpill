import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { View, Alert, StyleSheet } from 'react-native';
import { useDeletePillData } from '../Hooks/usePill';
import TextButton from './TextButton';
import { BoxShadow } from '../components';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

// TODO: MyPage에 있는 약 목록을 삭제하는 기능을 구현합니다.
const ManageList = ({ id, pillName, time, navigate }) => {
  const { mutate: deletePill } = useDeletePillData();
  const { theme } = useContext(ThemeContext);

  const handleDeletePill = (id) => {
    Alert.alert(
      '약 기록을 삭제하시겠습니까?',
      '삭제할 때는 마음대로지만 복구할 때는 아닙니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            deletePill(id);
          },
        },
      ],
    );
  };

  return (
    <BoxShadow color={theme === 'light' ? 'white' : '#343639'}>
      <ManageListTitle theme={theme}>{pillName}</ManageListTitle>
      <ButtonGroupContainer>
        <TextButton
          // 클릭하면 페이지 이동
          buttonColor={theme === 'light' ? COLORS.BLACK : 'white'}
          buttonText="편집"
          onPress={() =>
            navigate('Stacks', {
              screen: '수정 페이지',
              params: {
                id: id,
                isEdit: true,
                eachPillName: pillName,
                eachTime: time,
              },
            })
          }
        />
        <TextButton
          // 클릭하면 alert()
          buttonColor={COLORS.DANGER}
          buttonText="삭제"
          onPress={() => handleDeletePill(id)}
        />
      </ButtonGroupContainer>
    </BoxShadow>
  );
};

const ManageListTitle = styled.Text`
  font-size: 28px;
  text-overflow: ellipsis;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const ButtonGroupContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`;

export default ManageList;
