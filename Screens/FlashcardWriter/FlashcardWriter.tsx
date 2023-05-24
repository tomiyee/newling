import { StyleSheet, Text, View } from 'react-native';

const FlashcardWriterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Flashcard Writer Screen</Text>
    </View>
  );
};

export default FlashcardWriterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
