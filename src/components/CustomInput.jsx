import styled from '@emotion/native';
import { Dimensions, View } from 'react-native';
import { COLORS } from '../shared/color';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//로그인타이틀
export const CustomInputText = ({ children }) => {
  return <CustonInputTitle>{children}</CustonInputTitle>;
};
//로그인 인풋
export const CustomTotalInput = ({
  value,
  onChange,
  onChangeText,
  secureTextEntry,
  placeholder,
  returnKeyType,
  type,
  keyboardType,
  style,
}) => {
  return (
    <CustomInputStyle
      type={type}
      keyboardType={keyboardType}
      value={value}
      onChange={onChange}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      returnKeyType={returnKeyType}
      style={style}
    />
  );
};
//로그인타이틀CSS
const CustonInputTitle = styled.Text`
  font-size: 28px;
  margin: 16px 0 10px 0;
`;
//로그인 인풋CSS
const CustomInputStyle = styled.TextInput`
  width: ${SCREEN_WIDTH - 40 + 'px'};
  border: 1px solid #d9d9d9;
  height: 80px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 20px;
`;
