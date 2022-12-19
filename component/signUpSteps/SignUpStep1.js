import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import MainInput from "../inputs/MainInput";
import DateInput from "../inputs/DateInput";
import { useToast } from 'native-base';


export default function SignUpScreenOne(props) {
  const toast = useToast()
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
    birthDate: new Date(),
    birthCity: "",
  });

  const handleValidate = () => {
    if(user.password !== user.passwordConfirm) {
      return toast.show({
        description: 'Les mots de passes ne sont pas identiques.'
      })
    }
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Inscription</Text>
        <FontAwesomeIcon icon={faUser} color="#F29231" size={40} />

        <Text style={styles.progression}>1/7</Text>
      </View>

      <View style={styles.background}>
        <View style={styles.subBackground}>
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
            <MainInput
              label="Ton genre"
              value={user.gender}
              onChangeText={(value) => setUser({ ...user, gender: value })}
              style={styles.input}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Date de naissance</Text>
            <MainInput
              label="Ta date de naissance"
              value={user.birthDate}
              onChangeText={(value) => setUser({ ...user, birthDate: new Date(value) })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville de naissance</Text>
            <MainInput
              label="Ta ville de naissance"
              value={user.birthCity}
              onChangeText={(value) => setUser({ ...user, birthCity: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mot de passe</Text>
            <MainInput
              label="Ton mot de passe"
              value={user.password}
              onChangeText={(value) => setUser({ ...user, password: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Confirmation</Text>
            <MainInput
              label="Confirmer le mot de passe"
              value={user.passwordConfirm}
              onChangeText={(value) => setUser({ ...user, passwordConfirm: value })}
              style={styles.input}
            />
          </View>
          <ValidateButton onPress={handleValidate} />
        </View>
      </View>
    </View>
  );
}

const makeStyles = () => {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
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
      overflow: "scroll",
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
    validate: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25,
    },
  });
};
