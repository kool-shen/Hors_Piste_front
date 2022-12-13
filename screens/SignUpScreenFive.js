import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Validate from "../component/Validate";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../reducers/user";

export default function SignUpScreenFive() {
  ////RÉCUPÉRER LA PHOTO DANS LE STORE////

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    photo: "",
  });

  const [value, setValue] = useState(null);

  const handleValidate = () => {
    dispatch(updateUserProperties(user));
  };

  console.log(user);
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

  if (!hasPermission) {
    return <View></View>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Inscription</Text>
        <Text style={styles.progression}>4/7</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.subBackground}>
          <Camera
            style={styles.camera}
            ref={(ref) => (cameraRef = ref)}
          ></Camera>
          <TouchableOpacity
            style={styles.takePhoto}
            title="Snap"
            onPress={() => takePicture()}
          ></TouchableOpacity>
          <Validate handleClick={handleValidate} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F8DFBD",
    height: "100%",
    width: "100%",
    flex: 1,
    zIndex: -1,
  },
  camera: {
    display: "flex",
    width: 350,
    height: 350,
    borderRadius: 350,
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
  pageTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  progression: {
    color: "white",
    fontSize: 15,
    alignSelf: "flex-end",
  },
  takePhoto: {
    width: 100,
    height: 100,
    borderRadius: 200,
    backgroundColor: "darkred",
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
});
