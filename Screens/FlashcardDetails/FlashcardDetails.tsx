import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashcardSetID, flashcardSetSelector } from '../../recoil/flashcards';
import { Button, DataTable } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';

type FlashcardDetailsScreenProps = {
  flashcardSetId: FlashcardSetID;
};

const FlashcardDetailsScreen: FC<{
  route: { params: FlashcardDetailsScreenProps };
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation, route }) => {
  const { flashcardSetId } = route.params;
  const flashcardSet = useRecoilValue(flashcardSetSelector(flashcardSetId));
  const flashcards = flashcardSet?.flashcards ?? [];
  const columnNames = flashcardSet?.columnNames ?? [];
  // const flashcardSetName = flashcardSet?.name ?? '';

  // useEffect(() => {
  //   navigation.setOptions({ title: flashcardSetName });
  // }, [navigation, flashcardSetName]);

  const startPractice = () =>
    navigation.navigate('Practice', { flashcardSetId, defaultSide: 0 });

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

      <Button mode="contained" onPress={startPractice} style={{ flexGrow: 0 }}>
        Practice
      </Button>
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
