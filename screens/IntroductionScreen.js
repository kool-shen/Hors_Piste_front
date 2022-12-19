import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import logo from "../assets/logo.png";

const IntroductionScreen = ({ navigation }) => {
  const styles = makeStyles();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 2000);
  }, []);

  return (
    <View style={styles.globalContainer}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();
  return StyleSheet.create({
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
};

export default IntroductionScreen;
