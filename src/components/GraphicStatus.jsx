import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';
import { useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

const GraphicStatus = () => {
  const { data: uid } = useUID();
  const { isError, error, isLoading, data: pillList } = useGetPillData(uid);
  const [message, setMessage] = useState(false);

  const toggleSupportMessage = () => {
    setMessage((current) => !current);
  };

  if (isError) {
    return (
      <View>
        <Text>에러 페이지</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>로딩 화면</Text>
      </View>
    );
  }

  if (pillList !== undefined) {
    const totalPillNum = pillList.length;

    let isTakenNum = 0;
    for (pill of pillList) {
      if (pill.isTaken === true) {
        isTakenNum += 1;
      }
    }
    const leftPillNum = totalPillNum - isTakenNum;
    const opacity = isTakenNum / totalPillNum;
    let color = '';

    switch (true) {
      case opacity >= 0 && opacity <= 0.2:
        color = COLORS.POINT_COLOR_20;
        break;
      case opacity > 0.2 && opacity <= 0.4:
        color = COLORS.POINT_COLOR_40;
        break;
      case opacity > 0.4 && opacity <= 0.6:
        color = COLORS.POINT_COLOR_60;
        break;
      case opacity > 0.6 && opacity <= 0.8:
        color = COLORS.POINT_COLOR_80;
        break;
      case opacity > 0.6 && opacity <= 1:
        color = COLORS.POINT_COLOR_100;
        break;
    }
    const supportArr = [
      '건강한 습관으로 한 걸음 더!',
      '오늘 어제보다 건강해졌어요!',
      '에너지 뿜뿜!',
      '오늘도 캐치필 하세요~',
      '건강한 나를 만들어가요',
    ];
    let pop = Math.floor(Math.random() * supportArr.length);

    return (
      <GraphicContainer>
        {opacity === 1 ? (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fadeOut={true}
          />
        ) : null}
        <Supports>
          <TouchableOpacity onPress={toggleSupportMessage}>
            <SupportEmoji>👏</SupportEmoji>
          </TouchableOpacity>
          <View style={{ display: message ? 'none' : 'flex' }}>
            {opacity === 0 ? (
              <SupportTextContainer>
                <SupportText>아직 하나도 먹지 않았어요!</SupportText>
              </SupportTextContainer>
            ) : opacity === 1 ? (
              <SupportTextContainer>
                <SupportText>축하합니다! 캐치필 달성!</SupportText>
              </SupportTextContainer>
            ) : (
              <SupportTextContainer>
                <SupportText>
                  와! 벌써 <TakenPill>{isTakenNum}</TakenPill>개나 드셨네요!
                </SupportText>
              </SupportTextContainer>
            )}
          </View>

          <SupportTextContainer style={{ display: message ? 'flex' : 'none' }}>
            <SupportText>{supportArr[pop]}</SupportText>
          </SupportTextContainer>
        </Supports>
        <LeftPill style={{ backgroundColor: color }}>
          <LeftpillText1>남은 약:</LeftpillText1>
          <LeftpillText2>{leftPillNum}</LeftpillText2>
          <LeftpillText3>/{totalPillNum}</LeftpillText3>
        </LeftPill>
      </GraphicContainer>
    );
  }
};

export default GraphicStatus;

const GraphicContainer = styled.View`
  background-color: white;
  align-items: center;
  padding-bottom: 10px;
`;

const Supports = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
const SupportEmoji = styled.Text`
  font-size: 35px;
  position: absolute;
  left: -50px;
`;
const SupportTextContainer = styled.View`
  width: 280px;
  padding: 10px;
  background-color: lightgrey;
  border-radius: 22px;
  font-size: 20px;
  overflow: hidden;
`;

const SupportText = styled.Text`
  text-align: center;
`;

const TakenPill = styled.Text`
  color: ${COLORS.POINT_COLOR_100};
`;

const LeftPill = styled.View`
  margin-top: 15px;
  border-radius: 100px;
  width: 200px;
  height: 200px;
  position: relative;
`;

const LeftpillText1 = styled.Text`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  top: 10%;
`;
const LeftpillText2 = styled.Text`
  font-size: 80px;
  font-weight: 600;
  top: 15%;
  text-align: center;
`;
const LeftpillText3 = styled.Text`
  font-size: 50px;
  font-weight: 300;
  position: absolute;
  bottom: 0;
  right: -15%;
`;
