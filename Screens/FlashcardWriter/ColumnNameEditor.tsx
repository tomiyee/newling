import { View } from 'react-native';
import { Card, IconButton, TextInput } from 'react-native-paper';
import { Flashcard, FlashcardSet } from '../../recoil/flashcards';
import { useRecoilCallback, useRecoilState } from 'recoil';
import _ from 'lodash';
import { wipFlashcardSet } from '../../recoil/flashcardWriter';

/**
 * Renders a card with all the relevent behavior for updaitng the names of the columns
 */
const ColumnNameEditor = () => {
  const [workingFlashcardSet, setWorkingFlashcardSet] =
    useRecoilState(wipFlashcardSet);

  const addColumn = useRecoilCallback(({ snapshot, set }) => () => {
    const oldState: FlashcardSet =
      snapshot.getLoadable(wipFlashcardSet).contents;
    const newState = _.cloneDeep(oldState);
    newState.columnNames.push(`Side ${oldState.columnNames.length + 1}`);
    newState.flashcards = newState.flashcards.map((flashcard) => [
      ...flashcard,
      '',
    ]);
    set(wipFlashcardSet, newState);
  });

  const deleteColumn = useRecoilCallback(
    ({ snapshot, set }) =>
      (columnIndex: number) => {
        const oldState: FlashcardSet =
          snapshot.getLoadable(wipFlashcardSet).contents;
        const newState = _.cloneDeep(oldState);
        newState.columnNames = newState.columnNames.filter(
          (e, i) => i !== columnIndex
        );
        newState.flashcards = newState.flashcards.map(
          (flashcard) =>
            flashcard.filter((e, i) => i !== columnIndex) as Flashcard
        );
        set(wipFlashcardSet, newState);
      }
  );

  const updateColumnName = (text: string, columnIndex: number) => {
    setWorkingFlashcardSet((old) => {
      const newState = _.cloneDeep(old);
      newState.columnNames[columnIndex] = text;
      return newState;
    });
  };

  return (
    <Card style={{ width: '100%' }}>
      <Card.Title title="Flashcard Side Labels" />
      <Card.Content>
        {workingFlashcardSet.columnNames.map((columnName, columnIndex) => (
          <View
            key={`column-name-${columnIndex}`}
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 8 }}
          >
            <TextInput
              style={{ flex: 1, width: '100%' }}
              label={`Column ${columnIndex + 1} Name`}
              mode="outlined"
              value={columnName}
              onChangeText={(text) => updateColumnName(text, columnIndex)}
            />
            {workingFlashcardSet.columnNames.length > 1 && (
              <IconButton
                style={{ flex: 0 }}
                icon="trash-can"
                onPress={() => deleteColumn(columnIndex)}
              />
            )}
          </View>
        ))}
        <IconButton mode="contained" icon="plus" onPress={addColumn} />
      </Card.Content>
    </Card>
  );
};

export default ColumnNameEditor;
