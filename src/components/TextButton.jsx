import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';

const TextButton = ({ buttonColor, buttonText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ManageButton buttonColor={buttonColor}>{buttonText}</ManageButton>
    </TouchableOpacity>
  );
};

const ManageButton = styled.Text`
  font-size: 20px;
  line-height: 24px;
  margin: 0 0 0 16px;
  color: ${(props) => props.buttonColor};
`;

export default TextButton;
