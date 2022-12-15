import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import React from "react";

const ContactScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.mainContainer}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Mes Contacts</Text>
        </View>
        <View style={styles.background}>
          <View style={styles.subBackground}>
            <View style={styles.firstContainer}>
              <View>
                <Text style={styles.textContainer}>Référent Hors Piste</Text>
              </View>

              <Text style={styles.infoContainer}>
                Benjamin Tagawa 06 16 66 65 43 btag@horspistes.com
              </Text>
            </View>

            <View style={styles.secondContainer}>
              <View>
                <Text style={styles.textContainer}>Référent HAS</Text>
              </View>
              <Text style={styles.infoContainer}>
                Julien Hopper 06 16 66 65 43 leh-has@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F8DFBD",
    height: "100%",
    width: "100%",
    flex: 1,
    zIndex: -1,
  },
  background: {
    backgroundColor: "#A5D8E6",
    transform: [
      { rotate: "-35deg" },
      { translateX: -100 },
      { translateY: -50 },
    ],
    height: "100%",
    width: 600,
    flex: 1,
    alignItems: "center",
  },
  subBackground: {
    transform: [{ rotate: "35deg" }, { translateX: 9 }, { translateY: -16 }],
    height: "100%",
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 130,
    paddingBottom: 20,
  },

  pageTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  progression: {
    color: "white",
    fontSize: 15,
    alignSelf: "flex-end",
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
    width: 350,
    height: 200,
    justifyContent: "space-between",
  },
  secondContainer: {
    width: 350,
    height: 200,
    justifyContent: "space-between",
  },

  textContainer: {
    width: 350,
    height: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    color: "white",
    fontSize: 20,
  },
});
export default ContactScreen;
