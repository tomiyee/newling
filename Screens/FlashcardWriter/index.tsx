import { StyleSheet, View, ScrollView } from 'react-native';
import {
  FlashcardSet,
  FlashcardSetID,
  flashcardSetSelector,
} from '../../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { Card, Divider, TextInput, IconButton } from 'react-native-paper';
import ColumnNameEditor from './ColumnNameEditor';
import _ from 'lodash';
import FlashcardWriterFooter from './FlashcardWriterFooter';
import {
  emptyFlashcardSet,
  wipFlashcardSet,
} from '../../recoil/flashcardWriter';

// The values passed by the Stack Navigator
type FlashcardWriterScreenParams = {
  flashcardSetId?: FlashcardSetID;
};

// The final props the
export type FlashcardWriterScreenProps = {
  route: { params: FlashcardWriterScreenParams };
  navigation: NavigationProp<RootStackParamList>;
};

const FlashcardWriterScreen: FC<FlashcardWriterScreenProps> = ({
  navigation,
  route,
}) => {
  const { flashcardSetId } = route.params;
  const workingFlashcardSet = useRecoilValue(wipFlashcardSet);

  const initializeWorkingFlashcardSet = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        if (flashcardSetId === undefined)
          return set(wipFlashcardSet, emptyFlashcardSet());
        const referenceFlashcardSet = snapshot.getLoadable(
          flashcardSetSelector(flashcardSetId)
        ).contents;
        return set(wipFlashcardSet, referenceFlashcardSet);
      },
    [flashcardSetId]
  );

  useEffect(initializeWorkingFlashcardSet, [initializeWorkingFlashcardSet]);

  const updateFlashcardSetTitle = useRecoilCallback(
    ({ snapshot, set }) =>
      (name: string) => {
        const oldValue = snapshot.getLoadable(wipFlashcardSet).contents;
        const newValue = _.cloneDeep(oldValue);
        newValue.name = name;
        set(wipFlashcardSet, newValue);
      }
  );

  const updateFlashcard = useRecoilCallback(
    ({ snapshot, set }) =>
      (flashcardIndex: number, columnIndex: number, text: string) => {
        const oldState: FlashcardSet =
          snapshot.getLoadable(wipFlashcardSet).contents;
        const newState = _.cloneDeep(oldState);
        newState.flashcards[flashcardIndex][columnIndex] = text;
        set(wipFlashcardSet, newState);
      }
  );

  const removeFlashcard = useRecoilCallback(
    ({ snapshot, set }) =>
      (flashcardIndex: number) => {
        const oldState: FlashcardSet =
          snapshot.getLoadable(wipFlashcardSet).contents;
        const newState = _.cloneDeep(oldState);
        newState.flashcards = newState.flashcards.filter(
          (e, i) => i !== flashcardIndex
        );
        set(wipFlashcardSet, newState);
      }
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 1, gap: 8 }}>
          <TextInput
            label="Flashcard Set Name"
            mode="outlined"
            style={{ width: '100%' }}
            value={workingFlashcardSet.name}
            // onChangeText={(text) => console.log(text)}
            onChangeText={updateFlashcardSetTitle}
          />
          <ColumnNameEditor />
        </View>
        <View style={{ marginVertical: 16 }}>
          <Divider />
        </View>
        {workingFlashcardSet.flashcards.map((flashcard, index) => (
          <Card
            style={{ width: '100%', marginBottom: 16 }}
            key={`card-${index}`}
          >
            <Card.Title title={`Card ${index + 1}`} />
            <Card.Content>
              {workingFlashcardSet.columnNames.map((columnName, colIdx) => (
                <TextInput
                  label={columnName}
                  key={`${workingFlashcardSet.id}-card-${index}-col-${columnName}`}
                  style={{ marginBottom: 8, width: '100%' }}
                  mode="outlined"
                  value={flashcard?.[colIdx] ?? ''}
                  onChangeText={(text) => updateFlashcard(index, colIdx, text)}
                />
              ))}
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="trash-can"
                mode="contained"
                onPress={() => removeFlashcard(index)}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <View style={{ flex: 0, width: '100%' }}>
        <FlashcardWriterFooter navigation={navigation} />
      </View>
    </View>
  );
};

export default FlashcardWriterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
