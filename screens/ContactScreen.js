import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ContactScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [mission, setMission] = useState({});
  const styles = makeStyles();
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://10.2.1.233:3000/missions/${user.mission._id}/${user.userId}`
      );
      const missionData = await res.json();
      setMission(missionData.data);
    })();
  }, []);
  return (
    <View mainContainer>
      <ImageBackground
        source={require("../assets/contact.png")}
        style={styles.containerimage}
      >
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Mes Contacts</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View>
              <Text style={styles.textContainer}>Référent Hors Piste</Text>
            </View>

            {mission.projectReferant && (
              <Text style={styles.infoContainer}>
                {mission.projectReferant.surname} {mission.projectReferant.name}
                {"\n"}téléphone : {mission.projectReferant.phoneNumber}
                {"\n"}
                E-mail : {mission.projectReferant.email}
              </Text>
            )}
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.textContainer}>Référent HAS</Text>
            </View>
            {mission.projectReferant && (
              <Text style={styles.infoContainer}>
                {mission.missionReferant.surname} {mission.missionReferant.name}
                {"\n"}téléphone : {mission.missionReferant.phone}
                {"\n"}
                E-mail : {mission.missionReferant.email}
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const makeStyles = () => {
  const { width, height, fontScale } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      width: width,
      height: height,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    containerimage: {
      width: "100%",
      height: "100%",
    },
    cardContainer: {
      width: width,
      height: height * 0.5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      marginTop: height * 0.2,
    },
    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold",
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
    card: {
      backgroundColor: "#A5D8E6",
      width: 400,
      height: 200,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    textContainer: {
      fontSize: 30,
      fontStyle: "bold",
      marginEnd: 20,
    },
    infoContainer: {
      fontSize: 20,
    },
  });
};

export default ContactScreen;
