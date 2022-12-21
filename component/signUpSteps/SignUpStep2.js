import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";
import { useToast } from "native-base";
import PasswordInput from "../inputs/PasswordInput";
import PhoneInput from "../inputs/PhoneInput";

import MainInput from "../inputs/MainInput";

export default function SignUpScreenTwo(props) {
  const toast = useToast();
  const styles = makeStyles();
  const dispatch = useDispatch();
  const [firstPassword, setFirstPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState("");
  const userReducer = useSelector(state => state.user.value)

  const [user, setUser] = useState({
    phone: userReducer.phone,
    password: '',
    birthCity: userReducer.birthCity
  });

  function handleValidate() {
    if (firstPassword === checkPassword) {
      console.log(firstPassword);
      console.log(user);
      dispatch(updateUserProperties(user));
      props.nextStep(1);
    } else {
      toast.show({ description: "Les mots de passes ne correspondent pas" });
    }
  }

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle progressionStep="2" title="Inscription" />

        <View style={styles.background}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Ville de naissance</Text>
            <MainInput
              label="Ta ville de naissance"
              value={user.birthCity}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  birthCity: value
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Téléphone</Text>
            <MainInput
              label="Ton numéro de téléphone"
              value={user.phone}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  phone: value
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mot de passe</Text>
            <PasswordInput
              label="Ton mot de passe"
              value={user.firstPassword}
              onChangeText={(value) => setFirstPassword(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Confirmation mot de passe</Text>
            <PasswordInput
              label="Confirmation du mot de passe"
              value={checkPassword}
              onChangeText={(value) => {
                setCheckPassword(value);
                setUser({
                  ...user,
                  password: firstPassword
                });
              }}
            />
          </View>

          <NextPrevious
            nextStep={props.nextStep}
            handleValidate={handleValidate}
          />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const makeStyles = () => {
  const { fontScale, height } = useWindowDimensions();

  return StyleSheet.create({
    background: {
      flex: 1,
      minHeight: height,
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
      maxWidth: 300,
      textAlign: "center",
      fontSize: 15 / fontScale,
      borderRadius: 5,
      color: "white",
      paddingHorizontal: 10,
      margin: 5
    },
    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold"
    },
    progression: {
      color: "white",
      fontSize: 15 / fontScale,
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
      alignItems: "center",
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
      fontSize: 25 / fontScale
    }
  });
};
