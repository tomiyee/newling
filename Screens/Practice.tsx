import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  View,
} from 'react-native';
import { FlashcardSetID, flashcardSetSelector } from '../recoil/flashcards';
import { useRecoilValue } from 'recoil';
import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { IconButton, Text, Card } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import Svg, { Path } from 'react-native-svg';

type PracticeScreenProps = {
  flashcardSetId: FlashcardSetID;
  defaultSide: number;
};

const { height, width } = Dimensions.get('window');

const strokeStyles = {
  stroke: 'black',
  fill: 'transparent',
  strokeWidth: 16,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const;

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
    clearCanvas();
  };

  const previousCard = () => {
    setActiveCard((activeCard - 1 + numCards) % numCards);
    setActiveSide(defaultSide);
    clearCanvas();
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

  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[][]>([]);

  const onTouchMove = (event: GestureResponderEvent) => {
    const newPath = [...currentPath];

    //get current user touches position
    const { locationX, locationY } = event.nativeEvent;
    const x = locationX.toFixed(0);
    const y = locationY.toFixed(0);
    // create new point
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${x},${y} `;

    // add the point to older points
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const onTouchEnd = () => {
    // save the current path and clear it
    setPaths((old) => [...old, [...currentPath]]);
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setCurrentPath([]);
    setPaths([]);
  };

  return (
    <View style={styles.container}>
      {shuffledFlashcards.length > 0 && (
        <Card style={styles.prompt} onPress={flipCard}>
          <Card.Content>
            <Text variant="displaySmall">
              {shuffledFlashcards[activeCard][activeSide]}
            </Text>
          </Card.Content>
        </Card>
      )}
      <View style={styles.canvas}>
        <View
          style={styles.svgContainer}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Svg height={height * 0.7} width={width}>
            <Path d={currentPath.join('')} {...strokeStyles} />
            {paths.map((path, i) => (
              <Path d={path.join('')} key={`path-${i}`} {...strokeStyles} />
            ))}
          </Svg>
        </View>
      </View>
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
          onPress={clearCanvas}
          icon="eraser"
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
  svgContainer: {
    height: height * 0.7,
    width,
  },
});
