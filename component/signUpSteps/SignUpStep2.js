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
    address: { street: "", zipCode: "", city: "", country: "" },
    phone: ''
  });

  const handleValidate = () => {
    if (user.password !== user.passwordConfirm) {
      return toast.show({
        description: "Les mots de passes ne sont pas identiques.",
      });
    }
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <>
      <BannerScreenTitle progressionStep="2" />
      <View style={styles.background}>
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
          <Text style={styles.inputText}>Telephone</Text>
          <MainInput
            label="Ton numéro de téléphone"
            value={user.phone}
            onChangeText={(value) =>
              setUser({
                ...user,
                phone: value,
              })
            }
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Telephone</Text>
          <MainInput
            label="Ton numéro de téléphone"
            value={user.phone}
            onChangeText={(value) =>
              setUser({
                ...user,
                phone: value,
              })
            }
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Code Postal</Text>
          <MainInput
            label="Ton mot de passe"
            value={user.password}
            onChangeText={(value) => setUser({ ...user, password: value })}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Confirmation du mot de passe</Text>
          <MainInput
            label="Confirmer le mot de passe"
            value={user.passwordConfirm}
            onChangeText={(value) =>
              setUser({ ...user, passwordConfirm: value })
            }
            style={styles.input}
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
