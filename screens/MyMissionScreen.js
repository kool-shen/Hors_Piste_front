import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon, faPhone, faEnvelope } from "@fortawesome/react-native-fontawesome";
import BannerScreenTitle from "../component/BannerScreenTitle";


const MyMissionScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [mission, setMission] = useState({});
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
        <BannerScreenTitle title="Ma Mission" />
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
                <Text tyle={styles.text}>{user.CESNumber}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Durée de la mission : </Text>
                <Text tyle={styles.text}>du {startDate} au {endDate}</Text>
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
        <View
          style={styles.footer}
        >
          {/* <FontAwesome name='home' size={25} color={"#2D5971"} /> */}
         <FontAwesome name='home' size='40' color='orange' onPress={() => navigation.navigate('TabNavigator')}/>
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

    cardContainer: {
      backgroundColor: "#2D5971",
      height: height * 0.22,
      width: width * 0.85,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      // alignItems: "center",
      justifyContent: 'space-around',
      padding: 10,
      margin: height * 0.01,
      width: width * 0.95,
    },
    textContainer: {
      display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    taskContainer: {
      display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'flex-start',
      // alignItems: 'space-around',
    },
    infoContainer: {
      fontSize: 18,
      justifyContent: "space-around",
      textAlign: "center",
      textDecorationLine: "underline",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      color: "white",
      // padding: 10,
    },

    nameContainer: {
      color: "white",
      fontSize: 18,
      justifyContent: "space-between",
      textAlign: "center",
      display: "flex",
    },
    mainContainer: {
      paddingTop: height * 0.25,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      textAlign: "center",
      height: height * 0.8,
    },
    telContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      position: "absolute",
      top: height*0.88,
      height: height*0.12,
      width: width,
      backgroundColor: '#2D5971',
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
