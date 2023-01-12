import { View } from 'react-native';
import styled from '@emotion/native';

const BoxShadow = ({ children, color }) => {
  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            justifyContent: 'center',
            height: 80,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 16,
            margin: 10,
            backgroundColor: color,
            shadowColor: '#d0d0d0',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
          },
          android: {
            justifyContent: 'center',
            height: 80,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 16,
            backgroundColor: color,
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
