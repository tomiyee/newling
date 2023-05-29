import uuid from 'react-native-uuid';
import _ from 'lodash';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  Flashcard,
  FlashcardSet,
  flashcardSetsAtom,
} from '../../recoil/flashcards';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NavigationProp } from '@react-navigation/native';
import {
  wipFlashcardSet,
  validWipFlashcardSet,
} from '../../recoil/flashcardWriter';

const FlashcardWriterFooter: FC<{
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation }) => {
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

  const validWorkingFlashcardSet = useRecoilValue(validWipFlashcardSet);

  const saveFlashcardSet = useRecoilCallback(({ snapshot, set }) => () => {
    if (!validWorkingFlashcardSet) return;
    const workingFlashcardSet: FlashcardSet =
      snapshot.getLoadable(wipFlashcardSet).contents;
    const finishedFlashcardSet = _.cloneDeep(workingFlashcardSet);
    if (finishedFlashcardSet.id === null)
      finishedFlashcardSet.id = uuid.v4() as string;
    const oldState: FlashcardSet[] =
      snapshot.getLoadable(flashcardSetsAtom).contents ?? [];
    const newState = [
      ...oldState.filter((fSet) => fSet.id !== finishedFlashcardSet.id),
      finishedFlashcardSet,
    ];
    set(flashcardSetsAtom, newState);
    navigation.goBack();
  });

  return (
    <View
      style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8 }}
    >
      <Button
        icon="plus"
        mode="contained"
        onPress={addFlashcard}
        style={{ flex: 1 }}
      >
        Add Card
      </Button>
      <Button
        mode="contained"
        onPress={saveFlashcardSet}
        style={{ flex: 1 }}
        disabled={!validWorkingFlashcardSet}
      >
        Save Flashcards
      </Button>
    </View>
  );
};

export default FlashcardWriterFooter;
