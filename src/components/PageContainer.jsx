import { StyleSheet, SafeAreaView } from 'react-native';

const PageContainer = ({ children }) => {
  return <SafeAreaView style={styles.screenArea}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screenArea: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: 'white',
      },
      android: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
      },
    }),
  },
});

export default PageContainer;
