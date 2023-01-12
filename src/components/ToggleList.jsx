import { COLORS } from '../shared/color';
import styled from '@emotion/native';
import ToggleButton from './ToggleButton';
import { strToObjTime, translateTime } from '../utils/transTime';
import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';

// TODO: 조건부 스타일링 isTaken값이 false랑 true에 따라 다른 UI가 보입니다.
const ToggleList = ({ pillName, time, id, isTaken, uid }) => {
  const togglePayload = { pillName, time, isTaken, uid };
  const objTime = strToObjTime(time);
  const mainPageTime = translateTime(objTime);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.list}>
      <ToggleListItem theme={theme} isTaken={isTaken}>
        <ToggleListItemTextContainer>
          <ToggleListItemTitle theme={theme}>{pillName}</ToggleListItemTitle>
          <ToggleListItemTime theme={theme}>{mainPageTime}</ToggleListItemTime>
        </ToggleListItemTextContainer>
        <ToggleButton id={id} togglePayload={togglePayload} />
      </ToggleListItem>
    </View>
  );
};

const ToggleListItem = styled.View`
  height: 80px;
  padding: 12px 16px;
  box-shadow: 0px 0px 8px rgba(202, 202, 202, 0.23);
  background-color: ${(props) =>
    props.isTaken
      ? COLORS.POINT_COLOR_100
      : props.theme === 'light'
      ? 'white'
      : '#343639'};
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
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const ToggleListItemTime = styled.Text`
  font-size: 16px;
  margin: 0 0 0 16px;
  text-overflow: ellipsis;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
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

export default ToggleList;
