import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import FlashcardWriterScreen from "../Screens/FlashcardWriter/FlashcardWriter";
import TrackWriterScreen from "../Screens/TrackWriter/TrackWriter";
import PracticeScreen from "../Screens/Practice/Practice";

const RootStack = createStackNavigator();

const StackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={DrawerNavigator} options={{headerShown: false}}/>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="FlashcardWriter" component={FlashcardWriterScreen} />
        <RootStack.Screen name="TrackWriter" component={TrackWriterScreen} />
        <RootStack.Screen name="Practice" component={PracticeScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default StackNavigator;