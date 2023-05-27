import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilCallback } from 'recoil';
import {
  Flashcard,
  FlashcardSet,
  wipFlashcardSet,
} from '../../recoil/flashcards';

const FlashcardWriterFooter = () => {
  const addFlashcard = useRecoilCallback(({ snapshot, set }) => () => {
    const workingFlashcardSet: FlashcardSet =
      snapshot.getLoadable(wipFlashcardSet).contents;
    const newCard = new Array(workingFlashcardSet.columnNames.length).fill(
      ''
    ) as Flashcard;
    const newState = _.cloneDeep(workingFlashcardSet);
    newState.flashcards.push(newCard);
    set(wipFlashcardSet, newState);
  });

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button icon="plus" onPress={addFlashcard} style={{ flex: 2 }}>
          Add Card
        </Button>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
        <Button mode="outlined" onPress={addFlashcard} style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button mode="contained" onPress={addFlashcard} style={{ flex: 1 }}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default FlashcardWriterFooter;
