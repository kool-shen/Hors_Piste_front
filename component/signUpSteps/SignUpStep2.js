import { StyleSheet, TextInput, View, Text } from "react-native";
import { useState } from "react";
import Validate from "../Validate";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";

export default function SignUpScreenTwo(props) {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    address: { street: "", zipCode: "", city: "", country: "" },
  });

  function handleValidate() {
    dispatch(updateUserProperties(user));
    props.nextStep();
  }

  return (
    <>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Inscription</Text>
        <Text style={styles.progression}>2/7</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Adresse</Text>
            <TextInput
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, street: value },
                })
              }
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Code Postal</Text>
            <TextInput
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, zipCode: value },
                })
              }
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville</Text>
            <TextInput
              onChangeText={(value) =>
                setUser({ ...user, address: { ...user.address, city: value } })
              }
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Pays</Text>
            <TextInput
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, country: value },
                })
              }
              style={styles.input}
            />
          </View>

          <ValidateButton onPress={handleValidate} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
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
