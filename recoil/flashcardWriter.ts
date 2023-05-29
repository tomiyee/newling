import { atom, selector } from 'recoil';
import { FlashcardSet } from './flashcards';

export const emptyFlashcardSet = (): FlashcardSet => {
  return {
    name: '',
    id: null,
    columnNames: ['Side 1', 'Side 2'],
    flashcards: [['', '']],
  };
};

export const wipFlashcardSet = atom<FlashcardSet>({
  key: 'wipFlashcardSet',
  default: emptyFlashcardSet(),
});

export const validWipFlashcardSet = selector<boolean>({
  key: 'wipFlashcardSetValid',
  get: ({ get }) => {
    const wipFlashcardSetState = get(wipFlashcardSet);
    return (
      wipFlashcardSetState.name.length > 0 &&
      wipFlashcardSetState.flashcards.length > 0
    );
  },
});
