import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import FlashcardWriterScreen from '../Screens/FlashcardWriter/FlashcardWriter';
import TrackWriterScreen from '../Screens/TrackWriter/TrackWriter';
import PracticeScreen from '../Screens/Practice/Practice';
import { FC } from 'react';
import FlashcardDetailsScreen from '../Screens/FlashcardDetails/FlashcardDetails';

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
        />
        <RootStack.Screen name="TrackWriter" component={TrackWriterScreen} />
        <RootStack.Screen name="Practice" component={PracticeScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default StackNavigator;
