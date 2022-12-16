import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFile,
  faEnvelope,
  faPen,
  faCircleDot,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeScreen({ navigation }) {
  const styles = makeStyles();
  /*useEffect(() => {
    const keyframe = new Keyframe({
      from: {
        backgroundColor: "red",
      },
      to: {
        backgroundColor: "blue",
      },
    });
    console.log("Mount");
  }, []);*/

  return (
    <View style={styles.mainContainer}>
      <View /*animation={keyframe}*/ style={styles.container1}>
        <TouchableOpacity style={styles.card1}>
          <Text style={styles.mainText}>Mes{"\n"}documents</Text>
          <FontAwesomeIcon icon={faFile} size={50} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.card2}>
          <FontAwesomeIcon icon={faPen} size={50} style={styles.icon3} />
          <Text style={styles.mainText}>Signer</Text>
          <Text style={styles.secondaryText}> mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.card3}>
          <Text style={styles.mainText}>Transmettre</Text>
          <Text style={styles.secondaryText}> mes documents</Text>
          <FontAwesomeIcon icon={faEnvelope} size={50} style={styles.icon2} />
        </TouchableOpacity>
      </View>
      <View style={styles.container4}>
        <TouchableOpacity style={styles.card2}>
          <FontAwesomeIcon icon={faCircleDot} size={50} style={styles.icon3} />
          <Text style={styles.mainText}>Ma mission</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container5}>
        <TouchableOpacity style={styles.card1}>
          <Text style={styles.mainText}>Mes contacts</Text>
          <FontAwesomeIcon
            icon={faAddressBook}
            size={50}
            style={styles.icon2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();
  return StyleSheet.create({
    mainText: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold",
    },
    secondaryText: {
      color: "white",
      fontWeight: "bold",
    },
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1,
    },
    card1: {
      backgroundColor: "#A5D8E6",
      transform: [{ rotate: "13deg" }],
      width: 200,
      height: 80,
      borderRadius: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    card2: {
      backgroundColor: "#A5D8E6",
      transform: [{ rotate: "-13deg" }],
      width: 200,
      height: 80,
      borderRadius: 10,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 10,
    },
    card3: {
      backgroundColor: "#A5D8E6",
      transform: [{ rotate: "13deg" }],
      width: 200,
      height: 80,
      borderRadius: 10,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 10,
    },
    container1: {
      height: "20%",
      backgroundColor: "#F29231",
      transform: [{ rotate: "-13deg" }, { translateX: -19 }],

      width: 450,
      zIndex: 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container2: {
      backgroundColor: "#143143",
      height: "20%",
      transform: [{ rotate: "13deg" }, { translateX: -22 }, { translateY: 13 }],
      width: 450,
      zIndex: 3,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container3: {
      backgroundColor: "#F29231",
      height: "20%",
      transform: [{ rotate: "-13deg" }, { translateX: -21 }],
      width: 450,
      zIndex: 2,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container4: {
      backgroundColor: "#143143",
      height: "20%",
      transform: [{ rotate: "13deg" }, { translateX: -20 }],
      width: 450,
      zIndex: 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container5: {
      backgroundColor: "#F29231",
      height: "20%",
      transform: [{ rotate: "-13deg" }, { translateX: -21 }],
      width: 450,
      zIndex: 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: "white",
    },
    icon2: {
      color: "white",
      marginLeft: 10,
    },
    icon3: {
      color: "white",
      marginRight: 10,
    },
  });
};
