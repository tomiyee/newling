import { createStackNavigator } from '@react-navigation/stack';
import FlashcardWriterScreen from '../Screens/FlashcardWriter/FlashcardWriter';
import FlashcardsScreen from '../Screens/Flashcards/Flashcards';
import PracticeScreen from '../Screens/Practice/Practice';

const FlashcardsStack = createStackNavigator();

const FlashcardsStackScreen = () => {
  return (
    <FlashcardsStack.Navigator
      initialRouteName="FlashcardsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FlashcardsStack.Screen
        name="FlashcardsList"
        component={FlashcardsScreen}
      />
      <FlashcardsStack.Screen
        name="FlashcardWriter"
        component={FlashcardWriterScreen}
      />
      <FlashcardsStack.Screen
        name="Practice"
        component={PracticeScreen}
        options={{ headerShown: true }}
      />
    </FlashcardsStack.Navigator>
  );
};

export default FlashcardsStackScreen;
