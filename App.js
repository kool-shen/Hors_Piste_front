import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";

import * as React from "react";

import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import HomeScreen from "./screens/HomeScreen";
import { name as appName } from "./app.json";

import ProfileScreen from "./screens/ProfileScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import MyMissionScreen from "./screens/MyMissionScreen";
import ContactScreen from "./screens/ContactScreen";

const store = configureStore({
  reducer: { user },
});

import { useEffect } from "react";

import SplashScreen from "react-native-splash-screen";
import IntroductionScreen from "./screens/IntroductionScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Connexion" component={ConnexionScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="MyMission" component={MyMissionScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="1" component={SignUpScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
