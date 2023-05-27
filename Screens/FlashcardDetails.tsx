import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashcardSetID, flashcardSetSelector } from '../recoil/flashcards';
import { Button, DataTable, IconButton, Menu } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

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
  const flashcardSetName = flashcardSet?.name ?? '';

  useEffect(() => {
    navigation.setOptions({
      title: `${flashcardSetName} Details`,
      headerRight: () => (
        <IconButton
          onPress={() =>
            navigation.navigate('FlashcardWriter', { flashcardSetId })
          }
          icon="pencil"
        />
      ),
    });
  }, [navigation, flashcardSetName, flashcardSetId]);

  const startPractice = () =>
    navigation.navigate('Practice', { flashcardSetId, defaultSide });

  const [visible, setVisible] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [defaultSide, setDefaultSide] = useState(0);

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
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button mode="outlined" onPress={openMenu}>
                {`Show First: ${columnNames[defaultSide]}`}
              </Button>
            }
          >
            {columnNames.map((columnName, i) => (
              <Menu.Item
                key={columnName}
                onPress={() => {
                  closeMenu();
                  setDefaultSide(i);
                }}
                title={columnName}
              />
            ))}
          </Menu>
        </View>
        <Button
          mode="contained"
          onPress={startPractice}
          style={{ flexGrow: 0 }}
        >
          Practice Drawing
        </Button>
      </View>
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
