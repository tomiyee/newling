import React from 'react';
import FlashcardsScreen from './Screens/Flashcards/Flashcards';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TracksScreen from './Screens/Tracks/Tracks';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Flashcards">
        <Drawer.Screen name="Flashcards" component={FlashcardsScreen} />
        <Drawer.Screen name="Tracks" component={TracksScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
