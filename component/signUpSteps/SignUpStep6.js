import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import MainInput from "../inputs/MainInput";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadFile from "../UploadFile";
import NextPrevious from "../NextPrevious";

export default function SignUpScreenFive(props) {
  const styles = makeStyles();
  const userReducer = useSelector(state => state.user.value)
  ////RÉCUPÉRER LA PHOTO DANS LE STORE////

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    photo: "",
  });

  const handleValidate = async () => {
    dispatch(updateUserProperties(user));
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userReducer),
    });
    const userData = await res.json();
    if (userData.result) {
      dispatch(updateUserProperties(userData.data))
      const res = await fetch(`${BACKEND_URL}/docs/createFiles`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userReducer),
      });
      props.nextStep();
    }
    toast.show({
      description: userData.message,
    });
  }

  /////

  const isFocused = useIsFocused();

  /////CAMERA/////

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="6" />

        <View style={styles.background}>
          <Text style={styles.inputText}>Mon passeport</Text>

          <MainInput
            label="Numéro de passeport"
            value={user.ICNumber}
            onChangeText={(value) => setUser({ ...user, ICNumber: value })}
            style={styles.input}
          />
          <MainInput
            label="Date d'expiration du passeport"
            value={user.ICExpirationDate}
            onChangeText={(value) =>
              setUser({ ...user, ICExpirationDate: value })
            }
            style={styles.input}
          />
          <UploadFile title="Télécharger mon passeport" />

          <Text style={styles.inputText}>Mon RIB</Text>

          <MainInput
            label="Numéro IBAN"
            value={user.IBAN}
            onChangeText={(value) => setUser({ ...user, IBAN: value })}
            style={styles.input}
          />

          <UploadFile title="Télécharger mon RIB" />

          <ValidateButton onPress={handleValidate} />
          <NextPrevious />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();

  return StyleSheet.create({
    camera: {
      width: 350,
      height: 350,
      borderRadius: 350,
      overflow: "hidden",
      borderTopLeftRadius: 175,
    },

    cameraContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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

    inputText: {
      backgroundColor: "#143143",
      maxWidth: 150,
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
    redDot: {
      width: 60,
      height: 60,
      borderRadius: 120,
      backgroundColor: "darkred",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      borderWidth: 1,
      borderColor: "white",
    },
    mainText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },

    background: {
      flex: 1,
      minHeight: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20,
    },
  });
};
