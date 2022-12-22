import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect } from "react";
import { updateUserProperties } from "../reducers/user";
import {BACKEND_URL} from '@env'

export default function HomeScreen({ navigation }) {
  console.log('useeffect')
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${BACKEND_URL}/docs/listFolder/${user.folderIds.toSignFolderId}`
      );
      const documentsData = await res.json();
      dispatch(updateUserProperties({nbOfToSignDocs: documentsData.length}))
    })();
  }, []);
  const styles = makeStyles();
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.card1}
          onPress={() => navigation.navigate("MyDocuments")}
        >
          <Text style={styles.mainText}>Mes{"\n"}documents</Text>
          <FontAwesome name="folder-open" size={40} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.card2}
          onPress={() => navigation.navigate("SignDocuments")}
        >
          <FontAwesome name="pencil" size={40} style={styles.icon3} />
          <Text style={styles.mainText}>Signer</Text>
          <Text style={styles.secondaryText}> mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity
          style={styles.card3}
          onPress={() => navigation.navigate("UploadDocuments")}
        >
          <Text style={styles.mainText}>Transmettre</Text>
          <Text style={styles.secondaryText}> mes documents</Text>
          <FontAwesome name="upload" size={40} style={styles.icon2} />
        </TouchableOpacity>
      </View>
      <View style={styles.container4}>
        <TouchableOpacity
          style={styles.card2}
          onPress={() => navigation.navigate("MyMission")}
        >
          <FontAwesome name="plane" size={40} style={styles.icon3} />
          <Text style={styles.mainText}>Ma mission</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container5}>
        <TouchableOpacity
          style={styles.card1}
          onPress={() => navigation.navigate("MyContacts")}
        >
          <Text style={styles.mainText}>Mes contacts</Text>
          <FontAwesome name="address-book" size={50} style={styles.icon4} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
  return StyleSheet.create({
    mainText: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold"
    },
    secondaryText: {
      color: "white",
      fontWeight: "bold"
    },
    mainContainer: {
      paddingTop: height * 0.03,
      // paddingBottom: height*0.02,
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1
    },
    card1: {
      backgroundColor: "#2D5971",
      transform: [{ rotate: "13deg" }],
      width: 200,
      height: 80,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 15
    },
    card2: {
      backgroundColor: "#2D5971",
      transform: [{ rotate: "-13deg" }],
      width: 200,
      height: 80,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: 15
    },
    card3: {
      backgroundColor: "#2D5971",
      transform: [{ rotate: "13deg" }],
      width: 200,
      height: 80,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: 15
    },
    container1: {
      height: height * 0.1,
      backgroundColor: "#F29231",
      transform: [{ rotate: "-13deg" }, { translateX: -19 }],
      paddingRight: width * 0.07,
      width: width * 1.15,
      zIndex: 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    container2: {
      backgroundColor: "#143143",
      height: height * 0.1,
      transform: [{ rotate: "13deg" }, { translateX: -22 }, { translateY: 13 }],
      paddingRight: width * 0.05,
      width: width * 1.15,
      zIndex: 3,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    container3: {
      backgroundColor: "#F29231",
      height: "20%",
      transform: [{ rotate: "-13deg" }, { translateX: -21 }],
      paddingRight: width * 0.07,
      width: width * 1.15,
      zIndex: 2,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    container4: {
      backgroundColor: "#143143",
      height: "20%",
      transform: [{ rotate: "13deg" }, { translateX: -10 }, { translateY: 15 }],
      paddingRight: width * 0.1,
      width: width * 1.15,
      zIndex: 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    container5: {
      backgroundColor: "#F29231",
      height: "20%",
      transform: [{ rotate: "-13deg" }, { translateX: -21 }],
      paddingRight: width * 0.07,
      width: width * 1.15,
      zIndex: 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    icon: {
      color: "white",
      marginLeft: 10
    },
    icon2: {
      color: "white",
      marginLeft: 10
    },
    icon3: {
      color: "white",
      marginRight: 10
    },
    icon4: {
      color: "white",
      marginLeft: 5,
      marginRight: 5
    }
  });
};
