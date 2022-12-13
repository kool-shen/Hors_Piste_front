import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreenThree from "./screens/SignUpScreenThree";

import SignUpScreenTwo from "./screens/SignUpScreenTwo";
import SignUpScreenOne from "./screens/SignUpScreenOne";
import SignUpScreenFour from "./screens/SignUpScreenFour";
import SignUpScreenFive from "./screens/SignUpScreenFive";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import HomeScreen from "./screens/HomeScreen";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={SignUpScreenFive} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={SignUpScreenFive} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
