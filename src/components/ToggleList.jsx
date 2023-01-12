import { COLORS } from '../shared/color';
import styled from '@emotion/native';
import ToggleButton from './ToggleButton';
import { strToObjTime, translateTime } from '../utils/transTime';
import { BoxShadow } from '../components';
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
    <BoxShadow
      color={
        isTaken
          ? COLORS.POINT_COLOR_100
          : theme === 'light'
          ? 'white'
          : '#343639'
      }
    >
      <ToggleListItemTextContainer>
        <ToggleListItemTitle theme={theme}>{pillName}</ToggleListItemTitle>
        <ToggleListItemTime theme={theme}>{mainPageTime}</ToggleListItemTime>
      </ToggleListItemTextContainer>
      <ToggleButton id={id} togglePayload={togglePayload} />
    </BoxShadow>
  );
};

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

export default ToggleList;
