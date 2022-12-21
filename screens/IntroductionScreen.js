import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import Logo from "../assets/logo.png";

const IntroductionScreen = ({ navigation }) => {
  const styles = makeStyles();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 3000);
  }, []);

  return (
    <View style={styles.globalContainer}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    globalContainer: {
      backgroundColor: "white",
      flex: 1,
      width: width,
      height: height,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: "75%",
      height: 250,
     
    },
  });
};

export default IntroductionScreen;
