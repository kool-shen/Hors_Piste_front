import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import MainInput from "../inputs/MainInput";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";
import RegisterText from "../RegisterText";

export default function SignUpScreenThree(props) {
  const styles = makeStyles();
  const userReducer = useSelector(state => state.user.value);
  console.log('reducer', userReducer)
  const [user, setUser] = useState({
    emergencyContact: {
      name: userReducer.emergencyContact.name,
      surname: userReducer.emergencyContact.surname,
      relation: userReducer.emergencyContact.relation,
      phone: userReducer.emergencyContact.phone
    }
  });

  const dispatch = useDispatch();

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep(1);
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="4" />

        <View style={styles.background}>
          <View style={styles.emergencyContainer}>
            <FontAwesomeIcon icon={faAddressCard} size={50} />

            <Text style={styles.emergencyText}>
              Personne à contacter en cas d'urgence
            </Text>
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Prénom'/>
            <MainInput
              label="Prénom"
              value={user.emergencyContact.name}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  emergencyContact: { ...user.emergencyContact, name: value }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Nom'/>
            <MainInput
              label="Nom"
              value={user.emergencyContact.surname}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  emergencyContact: {
                    ...user.emergencyContact,
                    surname: value
                  }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Numéro de téléphone'/>
            <MainInput
              label="Numéro de téléphone"
              value={user.emergencyContact.phone}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  emergencyContact: { ...user.emergencyContact, phone: value }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <RegisterText text='Lien (famille, ami(e),...)'/>
            <MainInput
              label="Lien"
              value={user.emergencyContact.relation}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  emergencyContact: {
                    ...user.emergencyContact,
                    relation: value
                  }
                })
              }
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

    emergencyContainer: {
      backgroundColor: "#F29231",
      maxWidth: 350,
      maxHeight: 100,
      display: "flex",
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "white",
      justifyContent: "center",
      alignItems: "center",
      padding: 5
    },
    emergencyText: {
      fontSize: 20 / fontScale,
      fontWeight: "bold",
      textAlign: "center"
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
      maxWidth: 200,
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
