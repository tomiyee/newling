import { Button } from 'react-native';
import FlashcardsStackScreen from './FlashcardStack';
import TracksStackScreen from './TracksStack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Flashcards">
      <Drawer.Screen
        name="Flashcards"
        component={FlashcardsStackScreen}
        options={{
          headerRight: () => (
            <Button onPress={() => alert('This is a button!')} title="+" />
          ),
        }}
      />
      <Drawer.Screen
        name="Tracks"
        component={TracksStackScreen}
        options={{
          headerRight: () => (
            <Button onPress={() => alert('This is a button!')} title="+" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
