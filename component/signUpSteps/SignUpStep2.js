import {
  StyleSheet,
  TextInput,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import MainInput from "../inputs/MainInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function SignUpScreenTwo(props) {
  const styles = makeStyles();
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
        <FontAwesomeIcon icon={faUser} color="#F29231" size={40} />

        <Text style={styles.progression}>2/7</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Adresse</Text>
            <MainInput
              label="Ton adresse"
              value={user.address}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, street: value },
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Code Postal</Text>
            <MainInput
              label="Ton code postal"
              value={user.zipCode}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, zipCode: value },
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville</Text>
            <MainInput
              label="Ta ville de résidence"
              value={user.city}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, city: value },
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Pays</Text>
            <MainInput
              label="Ton pays de résidence"
              value={user.city}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, country: value },
                })
              }
            />
          </View>

          <ValidateButton onPress={handleValidate} />
        </View>
      </View>
    </>
  );
}

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
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
      fontSize: 15 / fontScale,
      borderRadius: 5,
      color: "white",
      paddingHorizontal: 10,
    },
    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold",
    },
    progression: {
      color: "white",
      fontSize: 15 / fontScale,
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
      alignItems: "center",
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
      fontSize: 25 / fontScale,
    },
  });
};
