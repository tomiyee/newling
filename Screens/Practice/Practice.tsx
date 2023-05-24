import { StyleSheet, Text, View } from 'react-native';

const PracticeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Practice Screen</Text>
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
