import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  const styles = makeStyles();
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <KeyboardAvoidingView>
      <ImageBackground
        source={require("../assets/backgrounds/homepage.jpg")}
        style={styles.mainContainer}
      >
        <View style={styles.secondContainer}>
          <TouchableOpacity
            style={styles.card1}
            onPress={() => navigation.navigate("MyDocuments")}
          >
            <Text style={styles.mainText}>Mes{"\n"}documents</Text>
            <FontAwesome name="folder-open" size={40} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card2}
            onPress={() => navigation.navigate("SignDocuments")}
          >
            <FontAwesome name="pencil" size={40} style={styles.icon3} />
            <Text style={styles.mainText}>Signer</Text>
            <Text style={styles.secondaryText}> mes documents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card3}
            onPress={() => navigation.navigate("UploadDocuments")}
          >
            <Text style={styles.mainText}>Transmettre</Text>
            <Text style={styles.secondaryText}> mes documents</Text>
            <FontAwesome name="upload" size={40} style={styles.icon2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card2}
            onPress={() => navigation.navigate("MyMission")}
          >
            <FontAwesome name="plane" size={40} style={styles.icon3} />
            <Text style={styles.mainText}>Ma mission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card1}
            onPress={() => navigation.navigate("MyContacts")}
          >
            <Text style={styles.mainText}>Mes contacts</Text>
            <FontAwesome name="address-book" size={50} style={styles.icon4} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
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
      height: height,
      width: width,
    },
    secondContainer: {
      backgroundColor: "transparent",
      height: height * 0.95,
      width: width,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    card1: {
      backgroundColor: "#A5D8E6",
      width: width * 0.5,
      height: height * 0.1,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2%",
    },
    card2: {
      backgroundColor: "#A5D8E6",
      width: width * 0.5,
      height: height * 0.1,
      borderRadius: 10,
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "2%",
    },
    card3: {
      backgroundColor: "#A5D8E6",
      width: width * 0.5,
      height: height * 0.1,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "2%",
    },

    icon: {
      color: "white",
      marginLeft: "20%",
    },
    icon2: {
      color: "white",
      marginLeft: "35%",
    },
    icon3: {
      color: "white",
      marginRight: "7%",
    },
    icon4: {
      color: "white",
      marginLeft: "5%",
      marginRight: "5%",
    },
  });
};
