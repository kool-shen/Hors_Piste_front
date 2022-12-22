import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Provider as StoreProvider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import user from "./reducers/user";
import HomeScreen from "./screens/HomeScreen";
import MyDocumentsScreen from "./screens/MyDocumentsScreen";
import MyMissionScreen from "./screens/MyMissionScreen";
import ContactsScreen from "./screens/ContactsScreen";
import UploadDocumentsScreen from "./screens/UploadDocumentsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SignDocumentsScreen from "./screens/SignDocumentsScreen";
import IntroductionScreen from "./screens/IntroductionScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';


const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const userReducer = useSelector(state => state.user.value)
  console.log(userReducer)
  const [tabBackgroundColor, setTabBackGroundColor] = useState("#2D5971");
  const [activeColorsMenu, setActiveColorsMenu] = useState({
    tabBackground: "#2D5971",
    activeIcon: "#A5D8E6",
    inactiveIcons: "#F29231",
  });

  const colors = ["#2D5971", "#F29231", "#F29231", "#143143", "#2D5971"];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "SignDocuments") {
            iconName = "pencil";
          } else if (route.name === "MyDocuments") {
            iconName = "folder-open";
          } else if (route.name === "UploadDocuments") {
            iconName = "upload";
          } else if (route.name === "MyMission") {
            iconName = "plane";
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
        headerShown: false,
      })}
      tabBarVisible={false}
      labeled={false}
      shifting={true}
      initialRouteName="Home"
      activeColor={activeColorsMenu.activeIcon}
      inactiveColor={activeColorsMenu.inactiveIcons}
      barStyle={{ backgroundColor: tabBackgroundColor }}
      theme={{ colors: { secondaryContainer: "yellow" } }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Accueil",
        }}
      />
      <Tab.Screen
        name="MyDocuments"
        component={MyDocumentsScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Documents",
        }}
      />
      <Tab.Screen
        name="SignDocuments"
        component={SignDocumentsScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Signer",
          tabBarBadge: userReducer.nbOfToSignDocs ? userReducer.nbOfToSignDocs : false
        }}
      />
      <Tab.Screen
        name="UploadDocuments"
        component={UploadDocumentsScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Envoyer",
        }}
      />
      <Tab.Screen
        name="MyMission"
        component={MyMissionScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Mission",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />
            {/* <Stack.Screen
              name="SignDocuments"
              component={SignDocumentsScreen}
            /> */}
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MyDocuments" component={MyDocumentsScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="UploadDocuments"
              component={UploadDocumentsScreen}
            />
            <Stack.Screen name="MyMission" component={MyMissionScreen} />
            <Stack.Screen name="MyContacts" component={ContactsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
