import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentFlashcardSetIdAtom,
  FlashcardSet,
  flashcardSetsAtom,
} from '../../recoil/flashcards';

type FlashcardItemProps = {
  flashcardSet: FlashcardSet;
  onPress: () => void;
};

const FlashcardItem = ({ flashcardSet, onPress }: FlashcardItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text>{flashcardSet.name}</Text>
    </TouchableOpacity>
  );
};

const FlashcardsScreen = ({ navigation }) => {
  const flashcardSets = useRecoilValue(flashcardSetsAtom);
  const setCurrentFlashcardSetID = useSetRecoilState(currentFlashcardSetIdAtom);

  return (
    <View>
      <FlatList
        data={flashcardSets}
        renderItem={({ item }) => (
          <FlashcardItem
            onPress={() => {
              setCurrentFlashcardSetID(item.id);
              navigation.navigate('Practice');
            }}
            flashcardSet={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FlashcardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
