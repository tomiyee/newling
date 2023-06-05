import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { flashcardSetsAtom } from '../../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { List, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import FlashcardsHeaderActions from './FlashcardHeaderActions';

const FlashcardsScreen: FC<{
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation }) => {
  const flashcardSets = useRecoilValue(flashcardSetsAtom) ?? [];

  useEffect(
    () =>
      navigation.setOptions({ headerRight: () => <FlashcardsHeaderActions /> }),
    [navigation]
  );

  return (
    <View>
      {flashcardSets.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>You have no Flashcards yet! Create your own!</Text>
        </View>
      )}
      {flashcardSets.map((flashcardSet) => (
        <List.Item
          key={flashcardSet.id}
          title={flashcardSet.name}
          description={`${flashcardSet.flashcards.length} Cards`}
          left={(props) => <List.Icon {...props} icon="card-multiple" />}
          onPress={() => {
            navigation.navigate('FlashcardSetDetails', {
              flashcardSetId: flashcardSet.id,
            });
          }}
        />
      ))}
    </View>
  );
};

export default FlashcardsScreen;
