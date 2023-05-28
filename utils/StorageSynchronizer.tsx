import { useRecoilCallback, useRecoilValue } from 'recoil';
import { flashcardSetsAtom } from '../recoil/flashcards';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageSynchronizer = () => {
  const flashcardSets = useRecoilValue(flashcardSetsAtom);

  const syncFlashcards = useRecoilCallback(
    ({ set }) =>
      () => {
        // Initialize the recoil atom on startup
        if (flashcardSets === undefined) {
          AsyncStorage.getItem('@flashcard_sets').then(
            (value: string | null) => {
              set(flashcardSetsAtom, value === null ? [] : JSON.parse(value));
            },
            (e) => {
              console.error(e);
            }
          );
        }
        // Update the async storage in every other update
        else {
          AsyncStorage.setItem(
            '@flashcard_sets',
            JSON.stringify(flashcardSets)
          );
        }
      },
    [flashcardSets]
  );

  useEffect(syncFlashcards, [syncFlashcards]);

  return null;
};

export default StorageSynchronizer;
