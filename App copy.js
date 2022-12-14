import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ConnexionScreen from "./screens/SignInScreen";
import MyMissionScreen from "./screens/MyMissionScreen";
import ContactScreen from "./screens/ContactScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
 reducer: { user },
});

import React, { useEffect } from "react";

import SplashScreen from "react-native-splash-screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Connexion" component={ConnexionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="MyMission" component={MyMissionScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />

      
    </Tab.Navigator>
  );
};

export default function App() {
  

  return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
