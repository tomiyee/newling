import React, { FC, useState } from 'react';
import { View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button, TextInput } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

const FlashcardUploaderScreen: FC = () => {
  const [flashcardSetTitle, setFlashcardSetTitle] = useState('');

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
      });

      if (res.type === 'success') {
        const { uri } = res;
        const fileContent = await FileSystem.readAsStringAsync(uri);
        console.log(fileContent);
      }
    } catch (err) {
      console.log('File picking error:', err);
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
