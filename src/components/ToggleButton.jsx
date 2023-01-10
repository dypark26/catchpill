import { COLORS } from '../shared/color';
import { useToggleTakenPill } from '../Hooks/usePill';
import styled from '@emotion/native';

const ToggleButton = ({ id, togglePayload }) => {
  const { mutate: toggleTaken } = useToggleTakenPill();
  const isTaken = togglePayload.isTaken;
  return (
    <ToggleButtonContainer
      isTaken={isTaken}
      onPress={() => toggleTaken({ id, togglePayload })}
    >
      <ToggleButtonText>{isTaken ? '취소' : '먹었어요!'}</ToggleButtonText>
    </ToggleButtonContainer>
  );
};

const ToggleButtonContainer = styled.TouchableOpacity`
  width: 96px;
  height: 56px;
  border: 1px solid white;
  background-color: ${COLORS.POINT_COLOR_100};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const ToggleButtonText = styled.Text`
  font-size: 20px;
  line-height: 24px;
`;

export default ToggleButton;
