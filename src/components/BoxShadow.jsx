import { View } from 'react-native';
import styled from '@emotion/native';

const BoxShadow = ({ children }) => {
  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 16,
            margin: 10,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
          },
          android: {
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 16,
            margin: 10,
            backgroundColor: 'white',
            elevation: 4,
          },
        }),
      }}
    >
      <Container>{children}</Container>
    </View>
  );
};

const Container = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default BoxShadow;
