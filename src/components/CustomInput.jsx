import styled from '@emotion/native';
import { Dimensions } from 'react-native';
import { COLORS } from '../shared/color';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//로그인 인풋
const CustomInput = ({
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
    <>
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
    </>
  );
};
//로그인 인풋CSS
const CustomInputStyle = styled.TextInput`
  width: ${SCREEN_WIDTH - 40 + 'px'};
  border-width: 1px;
  border-color: ${COLORS.CANCEL};
  height: 80px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 20px;
`;
export default CustomInput;
