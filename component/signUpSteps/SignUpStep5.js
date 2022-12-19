import { useState } from "react";

import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import MainInput from "../inputs/MainInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BannerScreenTitle from "../BannerScreenTitle";

import SelectInput from "../inputs/SelectInput";

export default function SignUpScreenFour(props) {
  const styles = makeStyles();
  ////reducer user ///

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    degrees: "",
    occupation: "",
    CESNumber: "",
  });

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <>
      <BannerScreenTitle progressionStep="5" />

      <View style={styles.background}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Diplôme</Text>
          <SelectInput
            label="Ton / tes diplôme(s)"
            value={user.degrees}
            onValueChange={(value) => setUser({ ...user, degrees: value })}
            style={styles.input}
            numberOfSelections="3"
            label1="1"
            label2="2"
            label3="3"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Situation</Text>
          <SelectInput
            label="Ta situation"
            value={user.occupation}
            onValueChange={(value) => setUser({ ...user, occupation: value })}
            style={styles.input}
            numberOfSelections="3"
            label1="1"
            label2="2"
            label3="3"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Numéro CES</Text>
          <MainInput
            label="Ton numéro CES"
            value={user.CESNumber}
            onChangeText={(value) => setUser({ ...user, CESNumber: value })}
          />
        </View>

        <ValidateButton onPress={handleValidate} />
      </View>
    </>
  );
}

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
    background: {
      flex: 1,
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
      fontSize: 20 / fontScale,
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
