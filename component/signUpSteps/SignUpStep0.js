import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import { Spinner } from "native-base";
import MainInput from "../inputs/MainInput";
import ValidateButton from "../buttons/ValidateButton";
import { BACKEND_URL } from "@env";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";
import RegisterText from "../RegisterText";

export default function SignInScreen({ navigation, nextStep }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [connectionCode, setConnectionCode] = useState("");
  const styles = makeStyles();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    console.log(`${BACKEND_URL}/users/firstConnection`);
    setLoading(true);
    const res = await fetch(`${BACKEND_URL}/users/firstConnection`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        connectionCode: connectionCode
      })
    });
    const userData = await res.json();
    console.log(userData);
    if (userData.result) {
      const res = await fetch(`${BACKEND_URL}/docs/createFolders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${userData.token}`,
        },
        body: JSON.stringify({
          connectionString: connectionCode
        })
      });
      const foldersData = await res.json();
      dispatch(
        updateUserProperties({
          ...userData.data,
          userId: userData.data._id,
          email: email,
          folderIds: foldersData.data,
          token: userData.token
        })
      );
      setLoading(false);
      nextStep(1);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" icon="faUser" />
        <View style={styles.background}>
          <View style={styles.containerSignin}>
            <View style={styles.inputContainer}>
              <RegisterText text="Email" />
              <MainInput
                label="Ton adresse mail"
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <RegisterText text="Code de connexion" />
              <MainInput
                label="Ton code de connection"
                value={connectionCode}
                onChangeText={(value) => setConnectionCode(value)}
                style={styles.input}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => handleConnect()}
              >
                <Text style={styles.validate}>S'inscrire</Text>
              </TouchableOpacity>
              {loading && <Spinner size="lg" />}
              <Text style={styles.notYet}>Déjà inscrit ?</Text>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.createText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    background: {
      flex: 1,
      height: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: height * 0.1
    },
    containerSignin: {
      display: "flex",
      alignItems: "center",
      height: height,
      justifyContent: "center"
    },
    inputContainer: {
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 25
    },
    input: {
      backgroundColor: "white",
      height: 40,
      width: 250,
      borderColor: "gray",
      borderWidth: 1,
      placeholderTextColor: "gray"
    },
    createButton: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: "#143143"
    },
    createText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20 / fontScale
    },

    notYet: {
      color: "white",
      paddingTop: 20,
      textAlign: "center"
    },
    validateButton: {
      backgroundColor: "green",
      paddingHorizontal: 40,
      borderRadius: 10
    },
    validate: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25 / fontScale,
      textAlign: "center"
    },
    connectButton: {
      marginTop: 30,
      backgroundColor: "#F29231",
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    validate: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20 / fontScale
    }
  });
};
