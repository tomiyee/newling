import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { IconButton } from 'react-native-paper';

import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { View } from 'react-native';

type FlashcardScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const FlashcardsHeaderActions = () => {
  const navigation = useNavigation<FlashcardScreenNavigationProp>();
  return (
    <View style={{ flexDirection: 'row' }}>
      <IconButton
        onPress={() => navigation.navigate('FlashcardUploader')}
        icon="upload"
      />
      <IconButton
        onPress={() => navigation.navigate('FlashcardWriter', {})}
        icon="plus"
      />
    </View>
  );
};

export default FlashcardsHeaderActions;
