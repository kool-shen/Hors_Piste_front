import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import * as Mail from "expo-mail-composer";
import { BACKEND_URL } from "@env";
import { Linking } from "react-native";
import BannerScreenTitle from "../component/BannerScreenTitle";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactsScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [mission, setMission] = useState({});
  const styles = makeStyles();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${BACKEND_URL}/missions/${user.mission._id}/${user.userId}`
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
        <BannerScreenTitle title="Mes contacts" />

        <View style={styles.mainContainer}>
          <View style={styles.firstContainer}>
            <Text style={styles.textContainer}>Référent Hors Piste</Text>

            {mission.projectReferant && (
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.nameContainer}>
                    {mission.projectReferant.surname}{" "}
                    {mission.projectReferant.name}
                  </Text>
                </View>
                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `tel:${mission.projectReferant.phoneNumber}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPhone} size={20} />
                    {mission.projectReferant.phoneNumber}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${mission.missionReferant.email}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} size={20} />
                    {mission.missionReferant.email}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.firstContainer}>
            <View>
              <Text style={styles.textContainer}>Référent HAS</Text>
            </View>
            {mission.projectReferant && (
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.nameContainer}>
                    {mission.missionReferant.surname}{" "}
                    {mission.missionReferant.name}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `tel:${mission.projectReferant.phoneNumber}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPhone} size={20} />
                    {mission.missionReferant.phone}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${mission.missionReferant.email}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} size={20} />
                    {mission.missionReferant.email}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
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
    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold",
    },
    pageTitleContainer: {
      backgroundColor: "#2D5971",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,

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
      height: 200,
      justifyContent: "space-around",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
    },
    textContainer: {
      fontSize: 30,
      fontWeight: "bold",
    },
    infoContainer: {
      fontSize: 25,
      justifyContent: "space-around",
      textAlign: "center",
      textDecorationLine: "underline",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding:10
    },

    nameContainer: {
      fontSize: 25,
      justifyContent: "space-between",
      textAlign: "center",
      display: "flex",
      
    },
    mainContainer: {
      paddingTop: 180,
      display: "flex",
      justifyContent: "space-around",
      textAlign: "center",
     
      height: height * 0.7,
      
    },
  });
};

export default ContactsScreen;



