import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const [mission, setMission] = useState({});

const MyMissionScreen = () => {
  const user = useSelector((state) => state.user.value);
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
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.mainContainer}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Ma Mission</Text>
        </View>
        <View style={styles.background}>
          <View style={styles.subBackground}>
            <View>
              <View>
                 {mission.projectName && <Text>
                  Type de mission: {mission.missionType}{'\n'}Nom du projet: {mission.projectName}{'\n'}Date de départ: {mission.startDate}{'\n'}Date de fin: {mission.endDate}
                </Text>}
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1
    },
    background: {
      backgroundColor: "#A5D8E6",
      transform: [
        { rotate: "-35deg" },
        { translateX: -100 },
        { translateY: -50 }
      ],
      height: "100%",
      width: 600,
      flex: 1,
      alignItems: "center"
    },
    subBackground: {
      transform: [{ rotate: "35deg" }, { translateX: 9 }, { translateY: -16 }],
      height: "100%",
      width: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20
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
    }
  });
};
export default MyMissionScreen;
