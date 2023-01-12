import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { COLORS } from '../shared/color';
import { useUID } from '../Hooks/useAuth';
import { useGetPillData } from '../Hooks/usePill';
import { useContext, useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { ThemeContext } from '../context/Theme';

const GraphicStatus = () => {
  const { data: uid } = useUID();
  const { theme } = useContext(ThemeContext);
  const { isError, error, isLoading, data: pillList } = useGetPillData(uid);

  //응원글과 먹은 약 상태글 토글하기 위한 state
  const [message, setMessage] = useState(false);

  //메세지 상태 토글 함수
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
    //배열 길이 = 전체 약 개수
    const totalPillNum = pillList.length;

    //isTaken true인 찾아서 먹은 약 개수 세기
    let isTakenNum = 0;
    for (pill of pillList) {
      if (pill.isTaken === true) {
        isTakenNum += 1;
      }
    }

    //남은 약 = 전체 약 - 먹은약
    const leftPillNum = totalPillNum - isTakenNum;

    // 남은약/전체약 비율 0~1
    const opacity = isTakenNum / totalPillNum;
    let color = '';

    //0~1까지 비율에 따라 투명도 다르게 주기
    switch (true) {
      case opacity == 0:
        color = theme === 'light' ? 'white' : '#343639';
        break;
      case opacity > 0 && opacity <= 0.2:
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

    //응원글 배열
    const supportArr = [
      '건강한 습관으로 한 걸음 더!',
      '오늘 어제보다 건강해졌어요!',
      '에너지 뿜뿜!',
      '오늘도 캐치필 하세요~',
      '건강한 나를 만들어가요',
    ];

    //배열의 인덱스 랜덤으로 뽑아주기
    let pop = Math.floor(Math.random() * supportArr.length);

    return (
      <GraphicContainer theme={theme}>
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
              <SupportTextContainer theme={theme}>
                <SupportText theme={theme}>
                  아직 하나도 먹지 않았어요!
                </SupportText>
              </SupportTextContainer>
            ) : opacity === 1 ? (
              <SupportTextContainer>
                <SupportText theme={theme}>
                  축하합니다! 캐치필 달성!
                </SupportText>
              </SupportTextContainer>
            ) : (
              <SupportTextContainer theme={theme}>
                <SupportText theme={theme}>
                  와! 벌써 <TakenPill>{isTakenNum}</TakenPill>개나 드셨네요!
                </SupportText>
              </SupportTextContainer>
            )}
          </View>

          <SupportTextContainer style={{ display: message ? 'flex' : 'none' }}>
            {/* 랜덤으로 뽑아준 인덱스 이용해서 응원글 랜덤 뽑기 */}
            <SupportText theme={theme}>{supportArr[pop]}</SupportText>
          </SupportTextContainer>
        </Supports>
        <LeftPill style={{ ...styles.circleShadow, backgroundColor: color }}>
          <LeftpillText1 theme={theme}>남은 약:</LeftpillText1>
          <LeftpillText2 theme={theme}>{leftPillNum}</LeftpillText2>
          <LeftpillText3 theme={theme}>/{totalPillNum}</LeftpillText3>
        </LeftPill>
      </GraphicContainer>
    );
  }
};

export default GraphicStatus;

const GraphicContainer = styled.View`
  align-items: center;
  padding-bottom: 10px;
  margin: 0 0 12px;
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
  background-color: ${(props) =>
    props.theme === 'light' ? '#d3d3d3' : '#343639'};
  border-radius: 22px;
  font-size: 20px;
  overflow: hidden;
`;

const SupportText = styled.Text`
  text-align: center;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white ')};
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
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;
const LeftpillText2 = styled.Text`
  font-size: 80px;
  font-weight: 600;
  top: 15%;
  text-align: center;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;
const LeftpillText3 = styled.Text`
  font-size: 50px;
  font-weight: 300;
  position: absolute;
  bottom: 0;
  right: -15%;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;

const styles = StyleSheet.create({
  circleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
