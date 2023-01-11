import styled from '@emotion/native';
import { Dimensions, View } from 'react-native';
import { COLORS } from '../shared/color';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//로그인 회원가입: title="Login",수정 : title="Edit",삭제 : title="delete"

//커스텀버튼
export const CustomButton = ({ onPress, children, disabled, title }) => {
  return (
    <CustomTotalButton title={title} onPress={onPress} disabled={disabled}>
      <ButtonCase children={children} />
    </CustomTotalButton>
  );
};
//커스텀버튼 타이틀
export const ButtonCase = ({ children }) => {
  return <CustomButtonText>{children}</CustomButtonText>;
};

//버튼CSS
const CustomTotalButton = styled.TouchableOpacity`
  width: ${(props) =>
    props.title == 'Login'
      ? SCREEN_WIDTH - 40 + 'px'
      : SCREEN_WIDTH / 2.3 + 'px'};
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: ${(props) =>
    props.title == 'delete'
      ? COLORS.CANCEL
      : props.disabled == true
      ? COLORS.POINT_COLOR_40
      : COLORS.POINT_COLOR_100};
  //title이 delete면 회색, disabled이 활성화됐으면 연한색,아니라면 진한색 출력
  border-radius: 10px;
  margin-top: 15px;
`;

//버튼 텍스트 CSS
const CustomButtonText = styled.Text`
  color: ${(props) =>
    props.title == '회원가입' ? COLORS.POINT_COLOR_100 : COLORS.BLACK};
  font-size: 28px;
`;
