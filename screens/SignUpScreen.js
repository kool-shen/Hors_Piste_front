import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import SignUpStep0 from "../component/signUpSteps/SignUpStep0";
import SignUpStep1 from "../component/signUpSteps/SignUpStep1";
import SignUpStep2 from "../component/signUpSteps/SignUpStep2";
import SignUpStep3 from "../component/signUpSteps/SignUpStep3";
import SignUpStep4 from "../component/signUpSteps/SignUpStep4";
import SignUpStep5 from "../component/signUpSteps/SignUpStep5";
import SignUpStep6 from "../component/signUpSteps/SignUpStep6";

export default function SignUpScreen({ navigation }) {
  const styles = makeStyles();
  ////reducer user ///
  const [stepValue, setStepValue] = useState(0);
  const nextStep = (direction) => setStepValue(stepValue + direction);
  let activeStep;
  if (stepValue === 0) {
    activeStep = (<SignUpStep0 navigation={navigation} nextStep={nextStep} />);
  } else if (stepValue === 1) {
    activeStep = <SignUpStep1 nextStep={nextStep} />;
  } else if (stepValue === 2) {
    activeStep = <SignUpStep2 nextStep={nextStep} />;
  } else if (stepValue === 3) {
    activeStep = <SignUpStep3 nextStep={nextStep} />;
  } else if (stepValue === 4) {
    activeStep = <SignUpStep4 nextStep={nextStep} />;
  } else if (stepValue === 5) {
    activeStep = <SignUpStep5 nextStep={nextStep} />;
  } else if (stepValue === 6) {
    activeStep = <SignUpStep6 nextStep={nextStep} />;
  } else if (stepValue === 7) {   
    navigation.navigate("TabNavigator");
    return;
  }
  return <View style={styles.mainContainer}>{activeStep}</View>;
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
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20,
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
