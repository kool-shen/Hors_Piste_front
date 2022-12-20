import { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import MainInput from "../inputs/MainInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";

import SelectInput from "../inputs/SelectInput";

export default function SignUpScreenFour(props) {
  const styles = makeStyles();
  ////reducer user ///

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    degrees: "",
    occupation: "",
    CESNumber: "",
  });

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="5" />

        <View style={styles.background}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Diplôme</Text>
            <SelectInput
              label="Ton niveau de diplôme"
              value={user.degrees}
              onValueChange={(value) => setUser({ ...user, degrees: value })}
              style={styles.input}
              numberOfSelections="7"
              label1="niveau VI: je n'ai jamais obtenu de diplôme"
              label2="niveau V (CAP, BEP...)"
              label3="niveau IV (baccalauréats, BP, BTM...)"
              label4="niveau III (BTS, DUT, BM, autres bac+2...)"
              label5='niveau II (licences, autres Bac+3...)'
              label6='niveau I (Masters, Doctorat, autres bac+4/5 et plus...)'
              label7='autre'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Situation</Text>
            <SelectInput
              label="Ta situation actuelle"
              value={user.occupation}
              onValueChange={(value) => setUser({ ...user, occupation: value })}
              style={styles.input}
              numberOfSelections="6"
              label1="en études"
              label2="en formation"
              label3="en volontariat"
              label4='en emploi'
              label5="en recherche d'emploi"
              label6='autre'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Numéro CES</Text>
            <MainInput
              label="Ton numéro CES"
              value={user.CESNumber}
              onChangeText={(value) => setUser({ ...user, CESNumber: value })}
            />
          </View>

          <ValidateButton onPress={handleValidate} />
        </View>
        <NextPrevious />
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
      paddingBottom: 20,
    },

    emergencyContainer: {
      backgroundColor: "#F5C2C8",
      maxWidth: 350,
      maxHeight: 100,
      display: "flex",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
    },
    emergencyText: {
      fontSize: 20 / fontScale,
      fontWeight: "bold",
      textAlign: "center",
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
    inputText: {
      backgroundColor: "#143143",
      maxWidth: 200,
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
      fontSize: 25 / fontScale,
    },
  });
};
