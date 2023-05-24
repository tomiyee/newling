import { createStackNavigator } from '@react-navigation/stack';
import TrackWriterScreen from '../Screens/TrackWriter/TrackWriter';
import TracksScreen from '../Screens/Tracks/Tracks';

const TracksStack = createStackNavigator();

const TracksStackScreen = () => {
  return (
    <TracksStack.Navigator
      initialRouteName="TracksList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TracksStack.Screen name="TracksList" component={TracksScreen} />
      <TracksStack.Screen name="TrackWriter" component={TrackWriterScreen} />
    </TracksStack.Navigator>
  );
};

export default TracksStackScreen;
