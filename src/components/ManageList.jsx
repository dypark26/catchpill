import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { TouchableOpacity } from 'react-native';

const ManageList = ({ pillName, time, id, navigate }) => {
  // console.log(pillName, time);
  return (
    <ManageListContainer>
      <ManageListTitle>{pillName}</ManageListTitle>
      <ButtonGroupContainer>
        <TextButton
          // 클릭하면 페이지 이동
          buttonColor={COLORS.BLACK}
          buttonText="편집"
          onPress={() =>
            navigate('Stacks', {
              screen: '수정 페이지',
              params: { isEdit: true, eachPillName: pillName, eachTime: time },
            })
          }
        />
        <TextButton
          // 클릭하면 alert()
          buttonColor={COLORS.DANGER}
          buttonText="삭제"
          onPress={() => console.log('삭제', id)}
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
