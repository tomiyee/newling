import { atom, selectorFamily } from 'recoil';
import uuid from 'react-native-uuid';
import { jsonToCSV } from 'react-native-csv';

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
      return flashcardSet?.columnNames ?? [];
    },
});

/**
 * Converts a description of a Flashcard Set into a representation in a CSV file.
 * This does not save the ID or the name of the Flashcard Set
 */
export const flashcardSetToCsv = (flashcardSet: FlashcardSet): string => {
  const flashcardSetJson = flashcardSet.flashcards.map((flashcardSides) => {
    const rowData = {};
    flashcardSet.columnNames.forEach(
      (colName, colIdx) => (rowData[colName] = flashcardSides[colIdx])
    );
    return rowData;
  });

  return jsonToCSV(JSON.stringify(flashcardSetJson));
};

/**
 * Constructs a Flashcard Set from the given CSV data.
 * Note: The name is empty by default and needs to be populated.
 * @param csvData The contents of the CSV file
 * @returns The flashcard set
 */
export const csvToFlashcardSet = (csvData: string): FlashcardSet => {
  console.log('TODO, Parse CSV Data:', csvData);
  const flashcardSet: FlashcardSet = {
    name: '',
    id: uuid.v4() as string,
    columnNames: [],
    flashcards: [],
  };
  return flashcardSet;
};
