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
import MainInput from "../inputs/MainInput";
import BannerScreenTitle from "../BannerScreenTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextPrevious from "../NextPrevious";
import RegisterText from "../RegisterText";

export default function SignUpScreenTwo(props) {
  const userReducer = useSelector(state => state.user.value);
  const styles = makeStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    address: {
      street: userReducer.address.street,
      zipCode: userReducer.address.zipCode,
      city: userReducer.address.city,
      country: userReducer.address.country
    }
  });
  function handleValidate() {
    dispatch(updateUserProperties(user));
    console.log(userReducer)
    props.nextStep(1);
  }
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/signupScreenBackground.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <BannerScreenTitle title="Inscription" progressionStep="3" />
        <View style={styles.background}>
          <View style={styles.inputContainer}>
          <RegisterText text='Adresse'/>
            <MainInput
              label="Ton adresse"
              value={user.address.street}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, street: value }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Code postal'/>
            <MainInput
              label="Ton code postal"
              value={user.address.zipCode}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, zipCode: value }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
          <RegisterText text='Ville de résidence'/>
            <MainInput
              label="Ta ville de résidence"
              value={user.address.city}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, city: value }
                })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <RegisterText text='Pays de résidence'/>
            <MainInput
              label="Ton pays de résidence"
              value={user.address.city}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  address: { ...user.address, country: value }
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
