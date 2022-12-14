import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useEffect } from "react";
import Logo from "../assets/Logo.png";

const IntroductionScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("TabNavigator");
    }, 3000);
  }, []);

  return (
    <View style={styles.globalContainer}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};
const styles = StyleSheet.create({
  globalContainer: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 600,
    marginLeft: 20,
  },
});

export default IntroductionScreen;
