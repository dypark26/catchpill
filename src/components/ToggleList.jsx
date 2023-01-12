import { COLORS } from '../shared/color';
import styled from '@emotion/native';
import ToggleButton from './ToggleButton';

// TODO: 조건부 스타일링 isTaken값이 false랑 true에 따라 다른 UI가 보입니다.
const ToggleList = ({ pillName, time, id, isTaken, uid }) => {
  const togglePayload = { pillName, time, isTaken, uid };

  // 받아온 문자열값 타임 스탬프로 전환
  const [dateValues, timeValues] = time.split('T');
  const [year, month, day] = dateValues.substr(1).split('-');
  const [hours, minutes, seconds] = timeValues.substr(0, 8).split(':');
  const timeObject = new Date(
    +year,
    +month - 1,
    +day + 1,
    +hours - 15,
    +minutes,
    +seconds,
  );
  // 시간 표시 옵션
  const options = { hour: 'numeric', minute: '2-digit' };

  return (
    <ToggleListItem isTaken={isTaken}>
      <ToggleListItemTextContainer>
        <ToggleListItemTitle>{pillName}</ToggleListItemTitle>
        <ToggleListItemTime>
          {timeObject.toLocaleString('en-KR', options)}
        </ToggleListItemTime>
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
`;

export default ToggleList;
