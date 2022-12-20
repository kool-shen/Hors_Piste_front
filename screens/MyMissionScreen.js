import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  ImageBackground
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
            <>
              <Text>Type de mission: {user.mission.missionType}</Text>
              <Text>Date de départ: {user.mission.startDate}</Text>
              <Text>Nom du projet: {user.mission.projectName}</Text>
              <Text>Date de fin: {user.mission.endDate}</Text>
            </>
            
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const makeStyles = () => {
  const { fontScale, height } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1
    },

    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold"
    },
    progression: {
      color: "white",
      fontSize: 15 / fontScale,
      alignSelf: "flex-end"
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
      padding: 10
    },
    missionListContainer: {
      height,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
};
export default MyMissionScreen;
