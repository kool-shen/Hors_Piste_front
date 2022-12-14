import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@env";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useToast } from "native-base";
import BannerScreenTitle2 from "../component/BannerScreenTitle2";

const UploadDocumentsScreen = () => {
  const toast = useToast();
  const user = useSelector((state) => state.user.value);
  const [uploadFile, setUploadFile] = useState({});
  const [uploadName, setUploadName] = useState("");
  const styles = makeStyles();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    setUploadName(result.name);
    const formData = new FormData();
    formData.append("document", { ...result, type: "image/jpeg" });
    setUploadFile(formData);
  };
  const sendDocument = async () => {
    console.log(`${BACKEND_URL}/docs/uploads/${user.folderIds.toValidateFolderId}`)
    if (!uploadName)
      return toast.show({ description: "Veuillez sélectionner un fichier !" });
    const res = await fetch(
      `${BACKEND_URL}/docs/uploads/${user.folderIds.toValidateFolderId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${user.token}`,
        },
        body: uploadFile,
      }
    );
    await res.json();
    toast.show({ description: `${uploadName} a été uploadé !` });

    setUploadName("");
    setUploadFile({});
  };
  return (
    <ImageBackground
      source={require("../assets/backgrounds/royalBlue.png")}
      style={styles.mainContainer}
    >
      <BannerScreenTitle2 title="Transmettre" icon="upload" />
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={pickDocument} style={styles.card}>
          <Text style={styles.mainText}>Choisir un fichier</Text>
          <Text style={styles.uploadText}>{uploadName}</Text>
          <FontAwesome name="upload" size={40} style={styles.icon2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendDocument} style={styles.button}>
          <Text style={styles.mainText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: height,
      width: width,
      flex: 1,
      zIndex: -1,
    },
    mainText: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold",
    },
    uploadText: {
      color: "white",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2D5971",
      width: width * 0.6,
      height: 100,
      borderRadius: 10,
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F29231",
      width: width * 0.35,
      height: height * 0.05,
      borderRadius: 10,
    },
    icon2: {
      color: "white",
    },
    listContainer: {
      height: height * 0.4,
      alignItems: "center",
      display: "flex",
      justifyContent: "space-around",
      top: height * 0.25,
    },
  });
};

export default UploadDocumentsScreen;
