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

const MyMissionScreen = () => {
  const user = useSelector((state) => state.user.value);
  const styles = makeStyles();
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/backgrounds/orange.png")}
        style={styles.mainContainer}
      >
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Ma Mission</Text>
        </View>
        <View style={styles.missionListContainer}>
          {user.mission.projectName && (
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.titleContainer}>Type de mission</Text>
                <Text style={styles.dataContainer}>
                  {user.mission.missionType}
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.titleContainer}> Date de départ</Text>
                <Text style={styles.dataContainer}>
                  {new Date(user.mission.startDate).toLocaleDateString("fr-FR")}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleContainer}>Nom du projet</Text>
                <Text style={styles.dataContainer}>
                  {user.mission.projectName}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleContainer}>Date de fin</Text>
                <Text style={styles.dataContainer}>
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
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1,
    },

    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
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
      
      justifyContent: "center",
      alignItems: "center",
    },
    infoContainer: {
      height: height * 0.45,
      width: width * 0.9,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 50,
    },

    textContainer: {
      fontSize: 0,
      fontWeight: "400",
      color: "#2D5971",
      backgroundColor: "#a5d8e6",
      height: height * 0.1,
      width: width * 0.85,
      display: "flex",
      padding: 20,
      borderRadius: 30,
    },
    titleContainer: {
      fontWeight: "bold",
      fontSize: 30,
    },
    dataContainer: {
      fontSize: 20,
      fontWeight: "600",
    },
  });
};
export default MyMissionScreen;
