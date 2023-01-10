import { View, Text } from 'react-native';
import styled from '@emotion/native';
import { COLORS } from '../shared/color';

const GraphicStatus = () => {
  return (
    <GraphicContainer>
      <Supports>
        <SupportEmoji>👏</SupportEmoji>
        <SupportText>
          와! 벌써 <TakenPill>5</TakenPill>개나 드셨네요!
        </SupportText>
      </Supports>

      <LeftPill>
        <LeftpillText1>남은 약:</LeftpillText1>
        <LeftpillText2>1</LeftpillText2>
        <LeftpillText3>/5</LeftpillText3>
      </LeftPill>
    </GraphicContainer>
  );
};

export default GraphicStatus;

const GraphicContainer = styled.View`
  background-color: white;
  margin-top: 5px;
  align-items: center;
`;

const Supports = styled.View`
  flex-direction: row;
`;
const SupportEmoji = styled.Text`
  font-size: 35px;
  position: absolute;
  left: -50px;
`;

const SupportText = styled.Text`
  text-align: center;

  width: 300px;
  padding: 10px;
  background-color: lightgrey;
  border-radius: 22px;
  font-size: 20px;
`;

const TakenPill = styled.Text`
  color: ${COLORS.POINT_COLOR_100};
`;

const LeftPill = styled.View`
  margin-top: 15px;
  background-color: rgba(15, 238, 198, 1);
  border-radius: 100px;
  width: 200px;
  height: 200px;
`;

const LeftpillText1 = styled.Text`
  font-size: 20px;
  font-weight: 400;
  top: 20px;
  left: 60px;
`;
const LeftpillText2 = styled.Text`
  font-size: 80px;
  font-weight: 600;
  top: 20px;
  left: 75px;
`;

const LeftpillText3 = styled.Text`
  font-size: 50px;
  font-weight: 300;
  left: 170px;
`;
