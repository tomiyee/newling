import { atom, selector } from 'recoil';

export type Flashcard = [string, string, ...string[]];

export type FlashcardSetID = string;

export type FlashcardSet = {
  id: FlashcardSetID;
  name: string;
  columnNames: string[];
  flashcards: Flashcard[];
};

const exampleFlashcardSet1: Flashcard[] = [
  ['是', 'shì', 'is, are, am, yes to be'],
  ['不', 'bù', '(negative prefix) no, not'],
  ['了', 'le/liǎo', 'to know, to understand'],
  ['人', 'rén', 'man, person, people'],
];
const exampleFlashcardSet2: Flashcard[] = [
  ['我', 'wǒ', 'I, me, myself'],
  ['在', 'zài', '(located) at, in, exist'],
  ['有', 'yǒu', 'to have, there is, there are, to exist, to be'],
  ['他', 'tā', 'he, him'],
];

export const flashcardSetsAtom = atom<FlashcardSet[]>({
  key: 'flashcardSet',
  default: [
    {
      id: '1',
      name: 'Unit 1 Flashcards',
      columnNames: ['Characters', 'Pīnyīn', 'English'],
      flashcards: exampleFlashcardSet1,
    },
    {
      id: '2',
      name: 'Unit 2 Flashcards',
      columnNames: ['Characters', 'Pīnyīn', 'English'],
      flashcards: exampleFlashcardSet2,
    },
  ],
});

export const currentFlashcardSetIdAtom = atom<FlashcardSetID>({
  key: 'currentFlashcardSetId',
  default: '1',
});

export const currentFlashcardSetSelector = selector({
  key: 'currentFlashcardSet',
  get: ({ get }) =>
    get(flashcardSetsAtom).find(
      (fset) => fset.id === get(currentFlashcardSetIdAtom)
    ),
});
