import { StyleSheet, Text, View } from 'react-native';

const TrackWriterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Track Writer Screen</Text>
    </View>
  );
};

export default TrackWriterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
