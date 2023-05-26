import { StyleSheet, View } from 'react-native';
import { FlashcardSetID, flashcardSetSelector } from '../../recoil/flashcards';
import { useRecoilValue } from 'recoil';
import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { IconButton, Text, Card } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';

type PracticeScreenProps = {
  flashcardSetId: FlashcardSetID;
  defaultSide: number;
};

const PracticeScreen: FC<{
  route: { params: PracticeScreenProps };
  navigation: NavigationProp<RootStackParamList>;
}> = ({ route, navigation }) => {
  const { flashcardSetId, defaultSide } = route.params;

  const currentFlashcardSet = useRecoilValue(
    flashcardSetSelector(flashcardSetId)
  );

  const [shuffledFlashcards, setShuffledFlashcards] = useState(
    currentFlashcardSet?.flashcards ?? []
  );
  const [activeCard, setActiveCard] = useState(0);
  const [activeSide, setActiveSide] = useState(defaultSide);

  const numSides = currentFlashcardSet.columnNames.length;
  const numCards = shuffledFlashcards.length;

  const nextCard = () => {
    setActiveCard((activeCard + 1) % numCards);
    setActiveSide(defaultSide);
  };

  const previousCard = () => {
    setActiveCard((activeCard - 1 + numCards) % numCards);
    setActiveSide(defaultSide);
  };

  const flipCard = () => setActiveSide((activeSide + 1) % numSides);

  // Shuffles the set of flashcards when it gets loaded
  useEffect(() => {
    setShuffledFlashcards(_.shuffle(currentFlashcardSet.flashcards));
  }, [currentFlashcardSet.flashcards]);

  // Prints the progress through the flash cards in the top right of the screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text variant="titleMedium" style={{ marginRight: 16 }}>
          {activeCard + 1}/{numCards}
        </Text>
      ),
    });
  }, [activeCard, navigation, numCards]);

  return (
    <View style={styles.container}>
      {shuffledFlashcards.length > 0 && (
        <Card style={styles.prompt} onPress={flipCard}>
          <Card.Content>
            <Text>{shuffledFlashcards[activeCard][activeSide]}</Text>
          </Card.Content>
        </Card>
      )}
      <View style={styles.canvas} />
      <View style={styles.controls}>
        <IconButton
          mode="contained"
          style={{ flexGrow: 1 }}
          onPress={previousCard}
          icon="chevron-left"
        />
        <IconButton
          mode="contained"
          style={{ flexGrow: 1 }}
          onPress={flipCard}
          icon="rotate-360"
        />
        <IconButton
          mode="contained"
          style={{ flexGrow: 1 }}
          onPress={nextCard}
          icon="chevron-right"
        />
      </View>
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prompt: {
    flex: 0, // flex = 0 takes only required room
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flex: 0, // flex = 0 takes only required room
    width: '100%',
    gap: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  canvas: {
    flex: 1, // flex = 1 with others = 0 fills the rest of the space
    width: '100%',
    backgroundColor: '#eee',
  },
});
