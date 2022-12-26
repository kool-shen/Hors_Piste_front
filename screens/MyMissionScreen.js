import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import BannerScreenTitle from "../component/BannerScreenTitle2";


const MyMissionScreen = () => {
  const user = useSelector((state) => state.user.value);
  const styles = makeStyles();

  let startDate = new Date(user.mission.startDate)
  startDate = `${startDate.getDay()}/${startDate.getMonth()}/${startDate.getFullYear()}`

  let endDate = new Date(user.mission.endDate)
  endDate = `${endDate.getDay()}/${endDate.getMonth()}/${endDate.getFullYear()}`

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/contactBackground.png")}
        style={styles.container}
      >
        <BannerScreenTitle icon='plane' title="Ma Mission" />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Structure d'accueil : </Text>
                <Text style={styles.text}>{user.mission.hostStructure.name}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Structure d'envoie : </Text>
                <Text style={styles.text}>{user.mission.supportStructure.name}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Numéro CES: </Text>
                <Text style={styles.text}>{user.CESNumber}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Durée de la mission : </Text>
                <Text style={styles.text}>du {startDate} au {endDate}</Text>
              </View>
            </View>
            <ScrollView>
            <View style={styles.cardContainer}>
              <View style={styles.taskContainer}>
                <Text style={styles.title}>Mes Tâches : </Text>
                <Text style={styles.text}>{user.mission.missionTask}</Text>
              </View>
            </View>
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
    },
    cardContainer: {
      backgroundColor: "#2D5971",
      height: height * 0.22,
      width: width * 0.85,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: 'space-around',
      padding: 10,
      margin: height * 0.01,
      width: width * 0.95,
    },
    textContainer: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    taskContainer: {
      display: 'flex',
    },
    mainContainer: {
      paddingTop: height * 0.25,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      textAlign: "center",
      height: height * 0.8,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
    text: {
      color: 'orange',
      fontSize: 15
    }
  });
};

export default MyMissionScreen;
