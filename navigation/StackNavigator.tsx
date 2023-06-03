import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import TrackWriterScreen from '../Screens/TrackWriter';
import PracticeScreen from '../Screens/Practice';
import FlashcardDetailsScreen from '../Screens/FlashcardDetails';
import FlashcardWriterScreen from '../Screens/FlashcardWriter';
import FlashcardUploaderScreen from '../Screens/FlashcardsUploader';

export type RootStackParamList = Record<string, object | undefined>;

const RootStack = createStackNavigator<RootStackParamList>();

/**
 * StackNavigator is the top-level navigator for the app. It contains
 * the DrawerNavigator and the modal screens.
 */
const StackNavigator: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="FlashcardSetDetails"
          component={FlashcardDetailsScreen}
          options={{ presentation: 'card' }}
        />
        <RootStack.Screen
          name="FlashcardWriter"
          component={FlashcardWriterScreen}
          options={{ title: 'Flashcard Writer' }}
        />
        <RootStack.Screen
          name="FlashcardUploader"
          component={FlashcardUploaderScreen}
          options={{ title: 'Flashcard Uploader' }}
        />
        <RootStack.Screen name="TrackWriter" component={TrackWriterScreen} />
        <RootStack.Screen name="Practice" component={PracticeScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default StackNavigator;
