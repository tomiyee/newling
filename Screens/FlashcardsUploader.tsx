import React, { FC, useState } from 'react';
import { View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, TextInput } from 'react-native-paper';
import { csvToFlashcardSet, flashcardSetsAtom } from '../recoil/flashcards';
import { useRecoilCallback } from 'recoil';
import uuid from 'react-native-uuid';
import FlashcardsTable from './FlashcardDetails/FlashcardsTable';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

/**
 * In the context of reading a CSV file, if you already
 * have the file stored locally on the device, you can
 * use `FileSystem.readAsStringAsync` to directly read
 * the contents from the file system. However, if the
 * CSV file is hosted on a server or accessible through
 * a URL, you would typically use `fetch` to download the
 * file's contents.
 */

/**
 * Prompts the user to select a CSV file somewhere on their system using
 * their native document picker.
 */
type FlashcardScreenNavigationProp = StackNavigationProp<RootStackParamList>;
const FlashcardUploaderScreen: FC = () => {
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  const [flashcardSetTitle, setFlashcardSetTitle] = useState('');

  const [flashcards, setFlashcards] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  const importCsv = async () => {
    const res = await pickDocument();
    if (res.type !== 'success') return;
    const { uri } = res;
    const csvText = await readDocument(uri);
    if (csvText === null) return;
    const flashcardSet = csvToFlashcardSet(csvText);
    setColumnNames(flashcardSet.columnNames);
    setFlashcards(flashcardSet.flashcards);
  };

  const saveFlashcardSet = useRecoilCallback(
    ({ set }) =>
      () => {
        const newFlashcardSet = {
          name: flashcardSetTitle,
          columnNames,
          flashcards,
          id: uuid.v4() as string,
        };
        set(flashcardSetsAtom, (old) => [newFlashcardSet, ...old]);
        navigation.navigate('Flashcards');
      },
    [flashcardSetTitle, flashcards, columnNames]
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Flashcard Set Name"
        mode="outlined"
        style={{ width: '100%' }}
        value={flashcardSetTitle}
        onChangeText={setFlashcardSetTitle}
      />
      <FlashcardsTable columnNames={columnNames} flashcards={flashcards} />
      <View style={{ flex: 0, gap: 5 }}>
        <Button mode="outlined" onPress={importCsv}>
          Upload CSV File
        </Button>
        <Button
          mode="contained"
          onPress={saveFlashcardSet}
          disabled={flashcardSetTitle.length < 1}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default FlashcardUploaderScreen;

const pickDocument = async (): Promise<DocumentPicker.DocumentResult> => {
  try {
    return DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });
  } catch (err) {
    console.error('Document Picking Error:', err);
    return {
      type: 'cancel',
    };
  }
};

const readDocument = async (uri: string): Promise<string | null> => {
  try {
    const fileContents = await fetch(uri);
    return await fileContents.text();
  } catch (err) {
    console.error('File Reading Error:', err);
    return null;
  }
};
