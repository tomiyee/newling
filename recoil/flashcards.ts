import AsyncStorage from '@react-native-async-storage/async-storage';
import { selector, selectorFamily } from 'recoil';

export type Flashcard = [string, string, ...string[]];

export type FlashcardSetID = string;

export type FlashcardSet = {
  id: FlashcardSetID;
  name: string;
  columnNames: string[];
  flashcards: Flashcard[];
};

export const flashcardSetsAtom = selector<FlashcardSet[]>({
  key: 'flashcardSet',
  get: async () => {
    let value: string | null;
    try {
      value = await AsyncStorage.getItem('@flashcard_sets');
    } catch (e) {
      console.log('Error', e);
    }
    console.log(value);
    if (value === null) {
      return [] as FlashcardSet[];
    }
    return JSON.parse(value);
  },
  set: () => (value: FlashcardSet[]) => {
    try {
      AsyncStorage.setItem('@flashcard_sets', JSON.stringify(value));
    } catch (e) {
      console.log('Error', e);
    }
  },
});

export const flashcardSetSelector = selectorFamily<
  FlashcardSet | undefined,
  FlashcardSetID
>({
  key: 'flashcardSetSelector',
  get:
    (id) =>
    ({ get }) => {
      const flashcardSets = get(flashcardSetsAtom);
      return flashcardSets.find((flashcardSet) => flashcardSet.id === id);
    },
});
