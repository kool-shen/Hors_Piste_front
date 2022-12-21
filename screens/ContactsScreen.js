import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
      console.log(mission.missionReferent ? true : false)
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
            <Text style={styles.textContainer}>Référent Hors Pistes</Text>

            {mission.projectReferent && (
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.nameContainer}>
                    {mission.projectReferent.surname}{" "}
                    {mission.projectReferent.name}
                  </Text>
                </View>
                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `tel:${mission.projectReferent.phoneNumber}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPhone} size={20} />
                    {mission.projectReferent.phoneNumber}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${mission.projectReferent.email}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} size={20} />
                    {mission.projectReferent.email}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.firstContainer}>
            <View>
              {mission.hostStructure && <Text style={styles.textContainer}>{mission.hostStructure.name}</Text>}
            </View>
            {mission.missionReferent && (
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.nameContainer}>
                    Référent :
                    {mission.missionReferent.surname}{" "}
                    {mission.missionReferent.name}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `tel:${mission.projectReferent.phoneNumber}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faPhone} size={20} />
                    {mission.missionReferent.phone}
                  </Text>
                </View>

                <View>
                  <Text
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${mission.missionReferent.email}`
                      );
                    }}
                    style={styles.infoContainer}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} size={20} />
                    {mission.missionReferent.email}
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
      margin: height*0.01,
      width: width * 0.95,
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
      padding: 10,
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
      justifyContent: "center",
      alignItems: 'center',
      textAlign: "center",
      width: width,
      height: height*0.8,

    },
  });
};

export default ContactsScreen;
