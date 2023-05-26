import React, { FC } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { flashcardSetsAtom } from '../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { List } from 'react-native-paper';

const FlashcardsScreen: FC<{
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation }) => {
  const flashcardSets = useRecoilValue(flashcardSetsAtom);
  return (
    <View>
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