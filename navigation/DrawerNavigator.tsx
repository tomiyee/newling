import FlashcardsScreen from '../Screens/Flashcards';
import TracksScreen from '../Screens/Tracks';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="Flashcards">
      <Drawer.Screen name="Flashcards" component={FlashcardsScreen} />
      <Drawer.Screen
        name="Tracks"
        component={TracksScreen}
        options={{
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('TrackWriter')}
              icon="plus"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
