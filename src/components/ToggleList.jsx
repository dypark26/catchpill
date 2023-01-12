import { COLORS } from '../shared/color';
import styled from '@emotion/native';
import ToggleButton from './ToggleButton';
import { strToObjTime, translateTime } from '../utils/transTime';
import { StyleSheet } from 'react-native';

// TODO: 조건부 스타일링 isTaken값이 false랑 true에 따라 다른 UI가 보입니다.
const ToggleList = ({ pillName, time, id, isTaken, uid }) => {
  const togglePayload = { pillName, time, isTaken, uid };
  const objTime = strToObjTime(time);
  const mainPageTime = translateTime(objTime);

  return (
    <ToggleListItem style={styles.list} isTaken={isTaken}>
      <ToggleListItemTextContainer>
        <ToggleListItemTitle>{pillName}</ToggleListItemTitle>
        <ToggleListItemTime>{mainPageTime}</ToggleListItemTime>
      </ToggleListItemTextContainer>
      <ToggleButton id={id} togglePayload={togglePayload} />
    </ToggleListItem>
  );
};

const ToggleListItem = styled.View`
  height: 80px;
  padding: 12px 16px;
  box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
  background-color: ${(props) =>
    props.isTaken ? COLORS.POINT_COLOR_100 : 'white'};
  margin: 8px 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ToggleListItemTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleListItemTitle = styled.Text`
  font-size: 28px;
  text-overflow: ellipsis;
`;

const ToggleListItemTime = styled.Text`
  font-size: 16px;
  margin: 0 0 0 16px;
  text-overflow: ellipsis;
`;

const styles = StyleSheet.create({
  list: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default ToggleList;
