import { useState } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BannerScreenTitle from "../BannerScreenTitle";

import MainInput from "../inputs/MainInput";
import DateInput from "../inputs/DateInput";
import { useToast } from "native-base";
import SelectInput from "../inputs/SelectInput";

export default function SignUpScreenOne(props) {
  const toast = useToast();
  const styles = makeStyles();
  ////reducer user ///

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    password: null,
    birthDate: new Date().toISOString(),
    birthCity: "",
  });

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <>
      <BannerScreenTitle progressionStep="1" />
      <View style={styles.background}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Prénom</Text>

          <MainInput
            label="Ton prénom"
            value={user.name}
            onChangeText={(value) => setUser({ ...user, name: value })}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Nom</Text>
          <MainInput
            label="Ton nom de famille"
            value={user.surname}
            onChangeText={(value) => setUser({ ...user, surname: value })}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Date de naissance</Text>
          <DateInput />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Genre</Text>
          <SelectInput
            label="Ton genre"
            value={user.degrees}
            onValueChange={(value) => setUser({ ...user, gender: value })}
            style={styles.input}
            numberOfSelections="4"
            label1="Homme"
            label2="Femme"
            label3="Transgenre"
            label4="Non-binaire"
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

    inputContainer: {
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    input: {
      margin: 10,
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
      alignItems: "center",
      padding: 10,
    },
    validateButton: {
      backgroundColor: "green",
      paddingHorizontal: 40,
      borderRadius: 10,
    },
  });
};
