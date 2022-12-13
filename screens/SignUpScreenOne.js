import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Validate from "../component/Validate";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../reducers/user";

export default function SignUpScreenOne({ navigation }) {
  ////reducer user ///

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    birthDate: "",
    birthCity: "",
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
        <Text style={styles.progression}>1/7</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Prénom</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, name: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Nom</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, surname: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mail</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, email: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Genre</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, gender: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mot de passe</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, password: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Date de naissance</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, birthDate: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville de naissance</Text>
            <TextInput
              onChangeText={(value) => setUser({ ...user, birthCity: value })}
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
    maxWidth: 150,
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
