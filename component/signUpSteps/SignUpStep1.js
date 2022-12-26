import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";

import MainInput from "../inputs/MainInput";
import DateInput from "../inputs/DateInput";
import { Toast, useToast } from "native-base";
import SelectInput from "../inputs/SelectInput";
import RegisterText from "../RegisterText";

export default function SignUpScreenOne(props) {
  const styles = makeStyles();
  const toast = useToast();
  const userReducer = useSelector(state => state.user.value)

  ////reducer user ///
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: userReducer.name,
    surname: userReducer.surname,
    gender: userReducer.gender,
    birthDate: userReducer.birthDate
  });

  const handleValidate = () => {
    if (
      !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
        user.birthDate
      )
    ) {
      return toast.show({
        description: "Le format de la date doit etre dd/mm/yyyy"
      });
    }
    dispatch(updateUserProperties(user));
    props.nextStep(1);
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="1" />
        <View style={styles.background}>
          <View style={styles.inputContainer}>
            <RegisterText text='Prénom'/>
            <MainInput
              label="Ton prénom"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Nom'/>
            <MainInput
              label="Ton nom de famille"
              value={user.surname}
              onChangeText={(value) => setUser({ ...user, surname: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Date de naissance'/>
            <MainInput
              label="dd/mm/yyyy"
              value={user.birthDate}
              onChangeText={(value) => setUser({ ...user, birthDate: value })}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Genre'/>
            <SelectInput
              label="Ton genre"
              value={user.degrees}
              onValueChange={(value) => setUser({ ...user, gender: value })}
              style={styles.input}
              numberOfSelections="3"
              label1="Homme"
              label2="Femme"
              label3="Non-binaire"
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
      paddingTop: height*0.2,
    },

    inputContainer: {
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    input: {
      margin: 10
    },
    progression: {
      color: "white",
      fontSize: 15,
      alignSelf: "flex-end"
    },
    validateButton: {
      backgroundColor: "green",
      paddingHorizontal: 40,
      borderRadius: 10
    }
  });
};
