import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EMail from "../component/EMail";
import * as Mail from "expo-mail-composer";
import { BACKEND_URL } from "@env";

const ContactsScreen = () => {
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/contactBackground.png")}
        style={styles.container}
      >
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Mes Contacts</Text>
        </View>

        <View style={styles.firstContainer}>
          <Text style={styles.textContainer}>Référent Hors Piste</Text>

          {mission.projectReferant && (
            <Text style={styles.infoContainer}>
              Name:{mission.projectReferant.surname}{" "}
              {mission.projectReferant.name}
              {"\n"}N°:{mission.projectReferant.phoneNumber}
              {"\n"}
              Mail:{mission.projectReferant.email}
            </Text>
          )}
        </View>
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.textContainer}>Référent HAS</Text>
          </View>
          {mission.projectReferant && (
            <Text style={styles.infoContainer}>
              Name:{mission.missionReferant.surname}{" "}
              {mission.missionReferant.name}
              {"\n"}N°:{mission.missionReferant.phone}
              {"\n"}
              Mail:{mission.missionReferant.email}
            </Text>
          )}
        </View>
        <TouchableOpacity>
          <Button title=" + Envoyer un mail" color="white" onPress={EMail} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
const makeStyles = () => {
  const { fontScale } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
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
    firstContainer: {
      backgroundColor: "#a5d8e6",
      justifyContent: "space-between",
      marginTop: 250,
      borderRadius: 15,
      height: 150,
    },
    secondContainer: {
      backgroundColor: "#a5d8e6",
      marginTop: 100,
      borderRadius: 15,
      height: 150,
    },

    textContainer: {
      fontSize: 30,
    },
    infoContainer: {
      fontSize: 15,
    },
  });
};

export default ContactsScreen;
