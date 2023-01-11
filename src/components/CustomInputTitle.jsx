import styled from '@emotion/native';

//로그인타이틀
const CustomInputTitle = ({ children }) => {
  return <CustonInputTitle>{children}</CustonInputTitle>;
};

//로그인타이틀CSS
const CustonInputTitle = styled.Text`
  font-size: 28px;
  margin: 16px 0 10px 0;
`;
export default CustomInputTitle;
