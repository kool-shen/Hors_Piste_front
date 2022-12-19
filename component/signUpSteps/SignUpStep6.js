import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";
import ValidateButton from "../buttons/ValidateButton";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import MainInput from "../inputs/MainInput";
import BannerScreenTitle from "../BannerScreenTitle";

export default function SignUpScreenFive(props) {
  const styles = makeStyles();
  ////RÉCUPÉRER LA PHOTO DANS LE STORE////

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    photo: "",
  });

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
    props.nextStep();
  };

  /////

  const isFocused = useIsFocused();

  /////CAMERA/////

  const [hasPermission, setHasPermission] = useState(false);
  let cameraRef = useRef(null);
  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    dispatch(updateUserProperties({ photo: photo.uri }));
    console.log(photo.uri);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  return (
    <>
      <BannerScreenTitle progressionStep="6" />

      <View style={styles.background}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Prendre ma photo de profil</Text>
        </View>
        <View style={styles.cameraContainer}>
          <Camera
            style={{
              zIndex: 1,
              width: 250,
              height: 250,
            }}
            ref={(ref) => (cameraRef = ref)}
          ></Camera>

          <TouchableOpacity
            style={styles.redDot}
            title="Snap"
            onPress={() => takePicture()}
          ></TouchableOpacity>
        </View>

        <ValidateButton onPress={handleValidate} />
      </View>
    </>
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
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20,
    },
  });
};