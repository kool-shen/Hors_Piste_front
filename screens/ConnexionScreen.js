import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../reducers/user";
import ValidateButton from "../component/buttons/ValidateButton";
import NormalInput from "../component/inputs/NormalInput";
import PasswordInput from "../component/inputs/PasswordInput";

export default function ConnexionScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = async () => {
    console.log(user);
    const res = await fetch(`http://10.2.1.233:3000/users/signin`, {
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
    console.log(userData);
    if (userData.result) {
      dispatch(
        updateUserProperties({
          ...userData.data,
          userId: userData.data._id,
          email: userData.data.email,
          token: userData.token,
        })
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}></View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.containerSignin}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Mail</Text>
              <NormalInput
                label="Ton adresse mail"
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Mot de passe</Text>

              <PasswordInput
                onChangeText={(value) => setPassword(value)}
                label="Ton mot de passe"
              />
            </View>
            <ValidateButton onPress={() => handleConnect()} />

            <TouchableOpacity>
              <Text style={styles.forgot}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <Text style={styles.notYet}>Pas encore de compte ?</Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  },
  containerSignin: {
    display: "flex",
    alignItems: "center",
    height: 350,
    justifyContent: "space-between",
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
    fontSize: 20,
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
    fontSize: 25,
  },
  logo: {
    width: "100%",
    height: 300,
    marginLeft: 90,
  },
});