import { StyleSheet, Text, View } from 'react-native';

const TracksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tracks Screen</Text>
    </View>
  );
};

export default TracksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
