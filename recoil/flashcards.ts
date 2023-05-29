import { atom, selectorFamily } from 'recoil';

export type Flashcard = [string, string, ...string[]];

export type FlashcardSetID = string;

export type FlashcardSet = {
  id: FlashcardSetID;
  name: string;
  columnNames: string[];
  flashcards: Flashcard[];
};

export const flashcardSetsAtom = atom<FlashcardSet[]>({
  key: 'flashcardSetAtom',
  default: undefined,
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

export const columnNamesSelector = selectorFamily<string[], FlashcardSetID>({
  key: 'columnNames',
  get:
    (id) =>
    ({ get }) => {
      const flashcardSet = get(flashcardSetSelector(id));
      return flashcardSet.columnNames;
    },
});
