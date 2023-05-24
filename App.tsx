import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import DrawerNavigator from './navigation/DrawerNavigator';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
