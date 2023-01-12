import styled from '@emotion/native';
import { Dimensions, View } from 'react-native';
import { COLORS } from '../shared/color';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
//로그인 인풋 title로 제목 기재
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
  title,
  theme,
}) => {
  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            shadowColor: theme === 'light' ? '#bbbbbb' : null,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
          },
          android: {
            backgroundColor: 'white',
            elevation: 4,
          },
        }),
      }}
    >
      <CustomInputTitle theme={theme}>{title}</CustomInputTitle>
      <CustomInputStyle
        theme={theme}
        type={type}
        keyboardType={keyboardType}
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={theme === 'light' ? '#d5d5d5' : '#636568'}
        returnKeyType={returnKeyType}
        style={style}
      />
    </View>
  );
};
//로그인 인풋CSS
const CustomInputStyle = styled.TextInput`
  width: ${SCREEN_WIDTH - 32 + 'px'};
  height: 80px;
  padding: 10px 20px;
  border-radius: 16px;
  font-size: 20px;
  color: ${(props) => (props.theme === 'light' ? '#343639' : 'white')};
  background-color: ${(props) =>
    props.theme === 'light' ? 'white' : '#343639'};
`;
//로그인타이틀CSS
const CustomInputTitle = styled.Text`
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
  font-size: 28px;
  margin: 16px 0 10px 0;
`;

export default CustomInput;
