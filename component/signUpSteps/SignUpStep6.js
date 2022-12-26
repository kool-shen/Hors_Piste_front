import { useState } from "react";

import {
  StyleSheet,
  View,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import MainInput from "../inputs/MainInput";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";
import { BACKEND_URL } from "@env";
import { useToast } from "native-base";
import RegisterText from "../RegisterText";

export default function SignUpScreenFive(props) {
  const styles = makeStyles();
  const userReducer = useSelector((state) => state.user.value);
  ////RÉCUPÉRER LA PHOTO DANS LE STORE////
  const toast = useToast();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    photo: "",
    ICNumber: "",
    ICExpirationDate: "",
    IBAN: ""
  });

  const handleValidate = async () => {
    dispatch(updateUserProperties(user));
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `bearer ${userReducer.token}`,
      },
      body: JSON.stringify(userReducer)
    });
    const userData = await res.json();
    if (userData.result) {
      dispatch(updateUserProperties(userData.data));
      await fetch(`${BACKEND_URL}/docs/createFiles`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `bearer ${userReducer.token}`,
        },
        body: JSON.stringify(userData.data)
      });
      props.nextStep(1);
    }
    toast.show({
      description: userData.message
    });
  };

  /////CAMERA/////

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="6" />

        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <RegisterText text='Numéro de passeport'/>
              <MainInput
                label="Numéro de passeport"
                value={user.phone}
                onChangeText={(value) =>
                  setUser({
                    ...user,
                    ICNumber: value
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <RegisterText text="Date d'expiration du passeport"/>
              <MainInput
                label="Date d'expiration du passeport"
                value={user.ICExpirationDate}
                onChangeText={(value) =>
                  setUser({
                    ...user,
                    ICExpirationDate: value
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <RegisterText text='Mon RIB'/>
              <MainInput
                label="Mon RIB"
                value={user.IBAN}
                onChangeText={(value) =>
                  setUser({
                    ...user,
                    IBAN: value
                  })
                }
              />
            </View>
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
  const { fontScale, width, height } = useWindowDimensions();

  return StyleSheet.create({
    cameraContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
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

    inputText: {
      backgroundColor: "#143143",
      maxWidth: 150,
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
    redDot: {
      width: 60,
      height: 60,
      borderRadius: 120,
      backgroundColor: "darkred",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      borderWidth: 1,
      borderColor: "white"
    },
    mainText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold"
    },

    background: {
      flex: 1,
      minHeight: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    
    contentContainer: {
      flex: 1,
      height: height*0.9,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: height*0.2,
    },
    inputContainer: {
      margin:15,
      height: 70,
      alignItems: "center",
      justifyContent: "center"
    }
  });
};
