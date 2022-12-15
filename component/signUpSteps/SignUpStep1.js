import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import NormalInput from "../inputs/NormalInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreenOne(props) {
  const styles = makeStyles();
  ////reducer user ///

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    birthDate: "",
    birthCity: ""
  });

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <KeyboardAwareScrollView
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

            <NormalInput
              label="Ton prénom"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Nom</Text>
            <NormalInput
              label="Ton nom de famille"
              value={user.surname}
              onChangeText={(value) => setUser({ ...user, surname: value })}
              style={styles.input}
            />
            <TextInput />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mail</Text>
            <NormalInput
              label="Ton adresse mail"
              value={user.email}
              onChangeText={(value) => setUser({ ...user, email: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Genre</Text>
            <NormalInput
              label="Ton genre"
              value={user.gender}
              onChangeText={(value) => setUser({ ...user, gender: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mot de passe</Text>
            <NormalInput
              label="Ton mot de passe"
              value={user.password}
              onChangeText={(value) => setUser({ ...user, password: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Date de naissance</Text>
            <NormalInput
              label="Ta date de naissance"
              value={user.birthDate}
              onChangeText={(value) => setUser({ ...user, birthDate: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville de naissance</Text>
            <NormalInput
              label="Ta ville de naissance"
              value={user.birthCity}
              onChangeText={(value) => setUser({ ...user, birthCity: value })}
              style={styles.input}
            />
          </View>
          <ValidateButton onPress={handleValidate} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
        { translateY: -50 }
      ],
      height: "100%",
      width: 600,
      flex: 1,
      alignItems: "center"
    },
    subBackground: {
      transform: [{ rotate: "35deg" }, { translateX: 9 }, { translateY: -16 }],
      height: "100%",
      width: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20
    },
    inputContainer: {
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    input: {
      backgroundColor: "white",
      height: 40,
      width: 250,
      borderColor: "gray",
      borderWidth: 1,
      placeholderTextColor: "gray"
    },
    inputText: {
      backgroundColor: "#143143",
      maxWidth: 150,
      textAlign: "center",
      fontSize: 15,
      borderRadius: 5,
      color: "white",
      paddingHorizontal: 10
    },
    pageTitle: {
      color: "white",
      fontSize: 40,
      fontWeight: "bold"
    },
    progression: {
      color: "white",
      fontSize: 15,
      alignSelf: "flex-end"
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
      padding: 10
    },
    validateButton: {
      backgroundColor: "green",
      paddingHorizontal: 40,
      borderRadius: 10
    },
    validate: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25
    }
  });
};
