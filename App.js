import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import user from "./reducers/user";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyDocumentsScreen from "./screens/MyDocumentsScreen";
import MyMissionScreen from "./screens/MyMissionScreen";
import ContactsScreen from "./screens/ContactsScreen";
import UploadDocumentsScreen from "./screens/UploadDocumentsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const store = configureStore({
  reducer: { user }
});

import IntroductionScreen from "./screens/IntroductionScreen";

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const [tabBackgroundColor, setTabBackGroundColor] = useState("#143143");
  const [activeColorsMenu, setActiveColorsMenu] = useState({
    tabBackground: "#143143",
    activeIcon: "#A5D8E6",
    inactiveIcons: "#F29231"
  });
  const [activeTab, setActiveTab] = useState("Home");
  const changeColor = (e) => {
    if (e.target.split("-")[0] == activeTab) return;
    setActiveTab(e.target.split("-")[0]);
    const colors = ["#A5D8E6", "#F29231", "#143143", "#2D5971"];
    console.log(e.target.split("-")[0]);
    console.log(activeTab);
    while (tabBackgroundColor === colors[0]) {
      colors.sort(() => Math.random() - 0.5);
    }
    setActiveColorsMenu({
      tabBackground: colors[0],
      activeIcon: colors[1],
      inactiveIcons: colors[2]
    });
    setTimeout(() => setTabBackGroundColor(colors[0]), 400);
  };

  return (
    <Tab.Navigator
      // barStyle={{ backgroundColor: '#2D5971' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "MyDocuments") {
            iconName = "file";
          } else if (route.name === "UploadDocuments") {
            iconName = "upload";
          } else if (route.name === "MyMission") {
            iconName = "plane";
          } else if (route.name === "MyContacts") {
            iconName = "address-book";
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
        headerShown: false
        
      })}
      labeled={false}
      shifting={true}
      initialRouteName="Home"
      activeColor={activeColorsMenu.activeIcon}
      inactiveColor={activeColorsMenu.inactiveIcons}
      
      barStyle={{ backgroundColor: tabBackgroundColor }}
      theme={{colors: {secondaryContainer: 'yellow'}}}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Accueil"
        }}
        listeners={{
          tabPress: (e) => {
            changeColor(e);
          }
        }}
        
      />
      <Tab.Screen
        name="MyDocuments"
        component={MyDocumentsScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Documents"
        }}
        listeners={{
          tabPress: (e) => {
            changeColor(e);
          }
        }}
      />
      <Tab.Screen
        name="MyMission"
        component={MyMissionScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Mission"
        }}
        listeners={{
          tabPress: (e) => {
            changeColor(e);
          }
        }}
      />
      <Tab.Screen
        name="MyContacts"
        component={ContactsScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Contacts"
        }}
        listeners={{
          tabPress: (e) => {
            changeColor(e);
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarColor: activeColorsMenu.tabBackground,
          title: "Profile"
        }}
        listeners={{
          tabPress: (e) => {
            changeColor(e);
          }
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
