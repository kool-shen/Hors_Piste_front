import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BACKEND_URL } from "@env";
import { useToast } from "native-base";
import MainInput from "../component/inputs/MainInput";

export default function SignInScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = makeStyles();
  const toast = useToast();

  const handleConnect = async () => {
    console.log(password);
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const userData = await res.json();
    
    if (userData.result) {
      dispatch(
        updateUserProperties({
          ...userData.data,
          userId: userData.data._id,
          email: userData.data.email,
          token: userData.token,
        })
        );
        navigation.navigate("TabNavigator");
      }
      toast.show({
      description: userData.message,
    });
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/signinScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.background}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <MainInput
              label="Ton adresse mail"
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Mot de passe</Text>
            <MainInput
              label="Ton adresse mail"
              value={password}
              onChangeText={(value) =>
                setPassword(value)
              }
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.validateButton}
            onPress={() => handleConnect()}
          >
            <Text style={styles.validate}>Valider</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <Text style={styles.notYet}>Pas encore de compte ?</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.createText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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

      paddingBottom: 100,
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
    createButton: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: "#143143",
    },
    createText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20 / fontScale,
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
    forgot: {
      fontWeight: "bold",
      color: "red",
    },

    notYet: {
      color: "white",
      paddingTop: 20,
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
    logo: {
      width: 400,
      height: 400,
    },
  });
};
