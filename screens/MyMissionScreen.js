import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BannerScreenTitle from "../component/BannerScreenTitle";

const MyMissionScreen = () => {
  const user = useSelector((state) => state.user.value);
  const styles = makeStyles();
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/backgrounds/royalBlue.png")}
        style={styles.mainContainer}
      >
        <BannerScreenTitle title="Ma mission"/>
        <View style={styles.missionListContainer}>
          {user.mission.projectName && (
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Type de mission</Text>
                <Text style={styles.dataContainer}>
                  <FontAwesome
                    name="arrow-right"
                    size={20}
                    style={styles.icon}
                  />{" "}
                  {user.mission.missionType}
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Date de départ</Text>
                <Text style={styles.dataContainer}>
                  <FontAwesome
                    name="arrow-right"
                    size={20}
                    style={styles.icon}
                  />{" "}
                  {new Date(user.mission.startDate).toLocaleDateString("fr-FR")}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Nom du projet</Text>
                <Text style={styles.dataContainer}>
                  <FontAwesome
                    name="arrow-right"
                    size={20}
                    style={styles.icon}
                  />{" "}
                  {user.mission.projectName}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Date de fin</Text>
                <Text style={styles.dataContainer}>
                  <FontAwesome
                    name="arrow-right"
                    size={20}
                    style={styles.icon}
                  />{" "}
                  {new Date(user.mission.endDate).toLocaleDateString("fr-FR")}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: height,
      width: width,
      flex: 1,
      zIndex: -1,
    },

    pageTitle: {
      color: "white",
      fontSize: 35 / fontScale,
      fontWeight: "bold",
    },
    progression: {
      color: "white",
      fontSize: 15 / fontScale,
      alignSelf: "flex-end",
    },
    pageTitleContainer: {
      backgroundColor: "#2D5971",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      zIndex: 90,
      width: "80%",
      position: "absolute",
      top: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    missionListContainer: {
      marginTop: height*0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    infoContainer: {
      height: height * 0.6,
      display: "flex",
      justifyContent: "space-around",
    },

    textContainer: {
      fontSize: 0,
      fontWeight: "400",
      color: "#2D5971",
      height: height * 0.1,
      width: width * 0.85,
      display: "flex",

      borderRadius: 10,
    },
    mainText: {
      fontWeight: "bold",
      fontSize: 25,
      color: "white",
    },
    dataContainer: {
      fontSize: 20,
      fontWeight: "light",
      color: "white",
    },
  });
};
export default MyMissionScreen;
