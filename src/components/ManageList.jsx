import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { TouchableOpacity, Alert } from 'react-native';
import { useDeletePillData } from '../Hooks/usePill';

// TODO: MyPage에 있는 약 목록을 삭제하는 기능을 구현합니다.
// TODO: 모달이 나와야 합니다.
const ManageList = ({ pillName, id }) => {
  const { mutate: deletePill } = useDeletePillData();

  const handleDelete = () => {
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
    <ManageListContainer>
      <ManageListTitle>{pillName}</ManageListTitle>
      <ButtonGroupContainer>
        <TextButton
          // 클릭하면 페이지 이동
          buttonColor={COLORS.BLACK}
          buttonText="편집"
          onPress={() => console.log('편집', id)}
        />
        <TextButton
          // 클릭하면 alert()
          buttonColor={COLORS.DANGER}
          buttonText="삭제"
          onPress={() => handleDelete()}
        />
      </ButtonGroupContainer>
    </ManageListContainer>
  );
};

const TextButton = ({ buttonColor, buttonText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ManageButton buttonColor={buttonColor}>{buttonText}</ManageButton>
    </TouchableOpacity>
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
  justify-content: end;
  gap: 16px;
`;

const ManageButton = styled.Text`
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 0 16px;
  color: ${(props) => props.buttonColor};
`;

export default ManageList;
