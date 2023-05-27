import { View } from 'react-native';
import { Card, IconButton, TextInput } from 'react-native-paper';
import { Flashcard, wipFlashcardSet } from '../../recoil/flashcards';
import { useRecoilState } from 'recoil';
import _ from 'lodash';

/**
 * Renders a card with all the relevent behavior for updaitng the names of the columns
 */
const ColumnNameEditor = () => {
  const [workingFlashcardSet, setWorkingFlashcardSet] =
    useRecoilState(wipFlashcardSet);

  const addColumn = () =>
    setWorkingFlashcardSet((old) => {
      const columnNames = [
        ...old.columnNames,
        `Side ${old.columnNames.length + 1}`,
      ];
      const flashcards: Flashcard[] = old.flashcards.map((flashcard) => [
        ...flashcard,
        '',
      ]);
      return { ...old, columnNames, flashcards };
    });

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
          <View key={`column-name-${columnIndex}`} style={{ marginBottom: 8 }}>
            <TextInput
              style={{ width: '100%' }}
              label={`Column ${columnIndex + 1} Name`}
              mode="outlined"
              value={columnName}
              onChangeText={(text) => updateColumnName(text, columnIndex)}
              right={<IconButton icon="minus" />}
            />
          </View>
        ))}
        <IconButton mode="contained" icon="plus" onPress={addColumn} />
      </Card.Content>
    </Card>
  );
};

export default ColumnNameEditor;
