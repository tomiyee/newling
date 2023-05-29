import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  DataTable,
  Dialog,
  IconButton,
  Portal,
  Text,
} from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import {
  FlashcardSet,
  FlashcardSetID,
  flashcardSetSelector,
  flashcardSetsAtom,
} from '../../recoil/flashcards';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { RootStackParamList } from '../../navigation/StackNavigator';
import PromptMenuButton from './PromptMenuButton';

type FlashcardDetailsScreenProps = {
  flashcardSetId: FlashcardSetID;
};

const FlashcardDetailsScreen: FC<{
  route: { params: FlashcardDetailsScreenProps };
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation, route }) => {
  const { flashcardSetId } = route.params;
  const flashcardSet = useRecoilValue(flashcardSetSelector(flashcardSetId));

  const { flashcards, columnNames } = flashcardSet;
  const flashcardSetName = flashcardSet.name;

  const [visibleDelete, setVisibleDelete] = useState(false);
  const hideDialog = () => setVisibleDelete(false);

  const [defaultSide, setDefaultSide] = useState(0);

  const editFlashcardSet = useCallback(
    () => navigation.navigate('FlashcardWriter', { flashcardSetId }),
    [navigation, flashcardSetId]
  );

  const startPractice = () =>
    navigation.navigate('Practice', { flashcardSetId, defaultSide });

  const deleteFlashcardSet = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const flashcardSets: FlashcardSet[] =
          snapshot.getLoadable(flashcardSetsAtom).contents;
        set(
          flashcardSetsAtom,
          flashcardSets.filter((fSet) => fSet.id !== flashcardSetId)
        );
        navigation.navigate('Flashcards');
      },
    [navigation]
  );

  useEffect(() => {
    navigation.setOptions({
      title: `${flashcardSetName} Details`,
      headerRight: () => (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <IconButton onPress={() => setVisibleDelete(true)} icon="trash-can" />
          <IconButton onPress={editFlashcardSet} icon="pencil" />
        </View>
      ),
    });
  }, [navigation, flashcardSetName, flashcardSetId, editFlashcardSet]);

  return (
    <View style={styles.container}>
      <DataTable style={{ flexGrow: 1 }}>
        <DataTable.Header>
          {columnNames.map((columnName) => (
            <DataTable.Title key={columnName}>{columnName}</DataTable.Title>
          ))}
        </DataTable.Header>
        {flashcards.map((flashcard, i) => (
          <DataTable.Row key={`${flashcardSetId}-card-${i}`}>
            {flashcard.map((sideContent) => (
              <DataTable.Cell key={sideContent}>{sideContent}</DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
      <View style={{ flex: 0, gap: 5 }}>
        <View style={{ flexGrow: 0 }}>
          <PromptMenuButton
            flashcardSetId={flashcardSetId}
            defaultSide={defaultSide}
            setDefaultSide={setDefaultSide}
          />
        </View>
        <Button mode="contained" onPress={startPractice}>
          Practice Drawing
        </Button>
      </View>
      <Portal>
        <Dialog visible={visibleDelete} onDismiss={hideDialog}>
          <Dialog.Title>Please confirm.</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you wwant to delete {flashcardSetName}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={deleteFlashcardSet}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FlashcardDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
