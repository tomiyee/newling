import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import StackNavigator from './navigation/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import StorageSynchronizer from './utils/StorageSynchronizer';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <PaperProvider>
          <StorageSynchronizer />
          <StackNavigator />
        </PaperProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
