import { StyleSheet, Text, View } from 'react-native';
import { currentFlashcardSetIdAtom } from '../../recoil/flashcards';
import { useRecoilValue } from 'recoil';

const PracticeScreen = () => {
  const currentFlashcardId = useRecoilValue(currentFlashcardSetIdAtom);
  return (
    <View style={styles.container}>
      <Text>Practice Screen</Text>
      <Text>{currentFlashcardId}</Text>
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
