import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = makeStyles();

  const handleConnect = async () => {
    console.log(user);
    navigation.navigate("TabNavigator");
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
    <KeyboardAwareScrollView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}></View>
        <View style={styles.background}>
          <View style={styles.subBackground}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View style={styles.containerSignin}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Mot de passe</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
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
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
      width: "100%",
      height: 300,
      marginLeft: 90,
    },
  });
};
