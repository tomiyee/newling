import React, { FC, useState } from 'react';
import { View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, TextInput } from 'react-native-paper';

/**
 * In the context of reading a CSV file, if you already
 * have the file stored locally on the device, you can
 * use `FileSystem.readAsStringAsync` to directly read
 * the contents from the file system. However, if the
 * CSV file is hosted on a server or accessible through
 * a URL, you would typically use `fetch` to download the
 * file's contents.
 */

const FlashcardUploaderScreen: FC = () => {
  const [flashcardSetTitle, setFlashcardSetTitle] = useState('');

  const pickFile = async () => {
    let res: DocumentPicker.DocumentResult;
    try {
      res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });
    } catch (err) {
      console.log('Document Picking Error:', err);
    }

    if (res.type !== 'success') return;
    const { uri } = res;

    try {
      const fileContents = await fetch(uri);
      const csvText = await fileContents.text();
      console.log(csvText);
    } catch (err) {
      console.log('File Reading Error:', err);
    }
  };

  return (
    <View>
      <TextInput
        label="Flashcard Set Name"
        mode="outlined"
        style={{ width: '100%' }}
        value={flashcardSetTitle}
        onChangeText={setFlashcardSetTitle}
      />
      <Button onPress={pickFile}>Upload CSV File</Button>
      <Button>Save</Button>
    </View>
  );
};

export default FlashcardUploaderScreen;
