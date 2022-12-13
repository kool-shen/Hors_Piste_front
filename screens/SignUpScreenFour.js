import { useState } from "react";
import { Camera } from "expo-camera";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Validate from "../component/Validate";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../reducers/user";

export default function SignUpScreenFour({ navigation }) {
  ////reducer user ///

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    degree: "",
    occupation: "",
    CESNumber: "",
  });

  /////
  const [value, setValue] = useState(null);

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    console.log(user);
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Inscription</Text>
        <Text style={styles.progression}>4/7</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Diplôme</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, degree: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Situation</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, occupation: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Numéro CES</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, CESNumber: value })}
              style={styles.input}
            />
          </View>

          <Validate handleClick={handleValidate} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
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
  emergencyContainer: {
    backgroundColor: "#F5C2C8",
    maxWidth: 350,
    maxHeight: 100,
    display: "flex",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  emergencyText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    placeholderTextColor: "gray",
  },
  inputText: {
    backgroundColor: "#143143",
    maxWidth: 200,
    textAlign: "center",
    fontSize: 15,
    borderRadius: 5,
    color: "white",
    paddingHorizontal: 10,
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
  validateButton: {
    backgroundColor: "green",
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  validate: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
});
