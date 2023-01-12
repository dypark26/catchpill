import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { View, Alert, StyleSheet } from 'react-native';
import { useDeletePillData } from '../Hooks/usePill';
import TextButton from './TextButton';

// TODO: MyPage에 있는 약 목록을 삭제하는 기능을 구현합니다.
const ManageList = ({ id, pillName, time, navigate }) => {
  const { mutate: deletePill } = useDeletePillData();

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
    <View style={styles.list}>
      <ManageListContainer style={styles.list}>
        <ManageListTitle>{pillName}</ManageListTitle>
        <ButtonGroupContainer>
          <TextButton
            // 클릭하면 페이지 이동
            buttonColor={COLORS.BLACK}
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
      </ManageListContainer>
    </View>
  );
};

const ManageListContainer = styled.View`
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

const ManageListTitle = styled.Text`
  font-size: 28px;
  text-overflow: ellipsis;
`;

const ButtonGroupContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
`;

const styles = StyleSheet.create({
  list: {
    ...Platform.select({
      ios: {
        shadowColor: '#d0d0d0',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 7,
      },
    }),
  },
});

export default ManageList;
