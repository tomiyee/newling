import { StyleSheet, View, FlatList } from 'react-native';
import {
  FlashcardSet,
  FlashcardSetID,
  emptyFlashcardSet,
  flashcardSetSelector,
  wipFlashcardSet,
} from '../../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { Card, Text, TextInput } from 'react-native-paper';
import ColumnNameEditor from './ColumnNameEditor';
import _ from 'lodash';
import FlashcardWriterFooter from './FlashcardWriterFooter';
type FlashcardWriterScreenProps = {
  flashcardSetId?: FlashcardSetID;
};

const FlashcardWriterScreen: FC<{
  route: { params: FlashcardWriterScreenProps };
  navigation: NavigationProp<RootStackParamList>;
}> = ({ route }) => {
  const { flashcardSetId } = route.params;
  const [workingFlashcardSet, setWorkingFlashcardSet] =
    useRecoilState(wipFlashcardSet);

  useEffect(() => {
    const initialFlashcardSet: FlashcardSet =
      flashcardSetId === undefined
        ? emptyFlashcardSet()
        : useRecoilValue(flashcardSetSelector(flashcardSetId));
    setWorkingFlashcardSet(initialFlashcardSet);
  }, [setWorkingFlashcardSet, flashcardSetId]);

  const updateFlashcardSetTitle = (name: string) =>
    setWorkingFlashcardSet((old) => ({ ...old, name }));

  const updateFlashcard = useRecoilCallback(
    ({ snapshot, set }) =>
      (flashcardIndex: number, columnIndex: number, text: string) => {
        const oldState = snapshot.getLoadable(wipFlashcardSet).contents;
        const newState = _.cloneDeep(oldState);
        newState.flashcards[flashcardIndex][columnIndex] = text;
        set(wipFlashcardSet, newState);
      }
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          style={{ width: '100%', height: '100%' }}
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
          renderItem={({ item: flashcard, index }) => (
            <Card style={{ width: '100%', marginBottom: 16 }}>
              <Card.Content>
                {workingFlashcardSet.columnNames.map((columnName, colIdx) => (
                  <TextInput
                    label={columnName}
                    key={`${workingFlashcardSet.id}-card-col-${columnName}`}
                    style={{ marginBottom: 8, width: '100%' }}
                    mode="outlined"
                    value={flashcard?.[colIdx] ?? ''}
                    onChangeText={(text) =>
                      updateFlashcard(index, colIdx, text)
                    }
                  />
                ))}
              </Card.Content>
            </Card>
          )}
        />
      </View>
      <View style={{ width: '100%' }}>
        <FlashcardWriterFooter />
      </View>
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
