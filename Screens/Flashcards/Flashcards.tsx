import React, { FC } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { FlashcardSet, flashcardSetsAtom } from '../../recoil/flashcards';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';

type FlashcardItemProps = {
  flashcardSet: FlashcardSet;
  onPress: () => void;
};

const FlashcardItem = ({ flashcardSet, onPress }: FlashcardItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text>{flashcardSet.name}</Text>
    </TouchableOpacity>
  );
};

const FlashcardsScreen: FC<{
  navigation: NavigationProp<RootStackParamList>;
}> = ({ navigation }) => {
  const flashcardSets = useRecoilValue(flashcardSetsAtom);

  return (
    <View>
      <FlatList
        data={flashcardSets}
        renderItem={({ item }) => (
          <FlashcardItem
            flashcardSet={item}
            onPress={() => {
              navigation.navigate('FlashcardSetDetails', {
                flashcardSetId: item.id,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FlashcardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
