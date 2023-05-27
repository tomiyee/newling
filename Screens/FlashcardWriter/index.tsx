import { StyleSheet, View, FlatList } from 'react-native';
import {
  Flashcard,
  FlashcardSet,
  FlashcardSetID,
  emptyFlashcardSet,
  flashcardSetSelector,
  wipFlashcardSet,
} from '../../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Card, IconButton, Text, TextInput } from 'react-native-paper';
import ColumnNameEditor from './ColumnNameEditor';

type FlashcardWriterScreenProps = {
  flashcardSetId?: FlashcardSetID;
};

const FlashcardWriterScreen: FC<{
  route: { params: FlashcardWriterScreenProps };
  navigation: NavigationProp<RootStackParamList>;
}> = ({ route }) => {
  const { flashcardSetId } = route.params;
  const initialFlashcardSet: FlashcardSet =
    flashcardSetId === undefined
      ? emptyFlashcardSet()
      : useRecoilValue(flashcardSetSelector(flashcardSetId));
  const [workingFlashcardSet, setWorkingFlashcardSet] =
    useRecoilState(wipFlashcardSet);
  useEffect(
    () => setWorkingFlashcardSet(initialFlashcardSet),
    [setWorkingFlashcardSet, initialFlashcardSet]
  );

  const updateFlashcardSetTitle = (name: string) =>
    setWorkingFlashcardSet((old) => ({ ...old, name }));

  const addFlashcard = () => {
    setWorkingFlashcardSet((old) => ({
      ...old,
      flashcards: [
        ...old.flashcards,
        new Array(old.columnNames.length).fill('') as Flashcard,
      ],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={workingFlashcardSet.flashcards}
        keyExtractor={(flashcard, i) => `${workingFlashcardSet.id}-card-${i}`}
        ListHeaderComponent={
          <View style={{ flex: 1, gap: 8, marginBottom: 8 }}>
            <TextInput
              label="Flashcard Set Name"
              style={{ width: '100%' }}
              value={workingFlashcardSet.name}
              onChangeText={updateFlashcardSetTitle}
            />
            <ColumnNameEditor />
            <Text variant="headlineMedium">Cards</Text>
          </View>
        }
        ListFooterComponent={<IconButton icon="plus" onPress={addFlashcard} />}
        renderItem={({ item: flashcard, index: flashcardIndex }) => (
          <Card style={{ width: '100%', marginBottom: 16 }}>
            <Card.Content>
              {workingFlashcardSet.columnNames.map(
                (columnName, columnIndex) => (
                  <TextInput
                    label={columnName}
                    key={`${workingFlashcardSet.id}-card-col-${columnName}`}
                    style={{ marginBottom: 8, width: '100%' }}
                    mode="outlined"
                    value={flashcard?.[columnIndex] ?? ''}
                    onChangeText={(text) =>
                      setWorkingFlashcardSet((old) => {
                        old.flashcards[flashcardIndex][columnIndex] = text;
                        return old;
                      })
                    }
                  />
                )
              )}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default FlashcardWriterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    gap: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
