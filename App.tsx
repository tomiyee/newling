import React from 'react';
import FlashcardsScreen from './Screens/Flashcards/Flashcards';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TracksScreen from './Screens/Tracks/Tracks';
import { RecoilRoot } from 'recoil';
import PracticeScreen from './Screens/Practice/Practice';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Flashcards">
          <Drawer.Screen name="Flashcards" component={FlashcardsScreen} />
          <Drawer.Screen name="Tracks" component={TracksScreen} />
          <Drawer.Screen name="Practice" component={PracticeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
