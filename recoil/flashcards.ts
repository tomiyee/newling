import { atom, selectorFamily } from 'recoil';
import { jsonToCSV } from 'react-native-csv';
import Papa from 'papaparse';

export type Flashcard = [string, string, ...string[]];

export type FlashcardSetID = string;

export type FlashcardSet = {
  id: FlashcardSetID;
  name: string;
  columnNames: string[];
  flashcards: Flashcard[];
};

export const flashcardSetsAtom = atom({
  key: 'flashcardSetAtom',
  default: undefined as FlashcardSet[],
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
 * Note: The id and name are empty by default and needs to be populated.
 * @param csvData The contents of the CSV file
 * @returns The flashcard set
 */
export const csvToFlashcardSet = (csvData: string): FlashcardSet => {
  const results = Papa.parse(csvData, {
    header: true,
  });
  const emptyFlashcard: FlashcardSet = {
    name: '',
    id: null,
    columnNames: [],
    flashcards: [],
  };

  if (results.errors.length > 0) {
    console.error('CSV Parsing Error:', results.errors);
    return emptyFlashcard;
  }

  const parsedData = results.data as Record<string, string>[];
  if (parsedData.length === 0) return emptyFlashcard;
  const columnNames = new Array(...Object.keys(parsedData[0]));
  const flashcards = parsedData.map(
    (flashcard) =>
      columnNames.map((columnName) => flashcard[columnName]) as Flashcard
  );
  return {
    ...emptyFlashcard,
    columnNames,
    flashcards,
  };
};
