import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@env";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useToast } from "native-base";

const UploadDocumentsScreen = () => {
  const toast = useToast();
  const user = useSelector((state) => state.user.value);
  const [uploadFile, setUploadFile] = useState({});
  const [uploadName, setUploadName] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const styles = makeStyles();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    setUploadName(result.name);
    const formData = new FormData();
    formData.append("document", { ...result, type: "image/jpeg" });
    setUploadFile(formData);
  };
  const sendDocument = async () => {
    if (!uploadName)
      return toast.show({ description: "Veuillez sélectionner un fichier !" });
    const res = await fetch(
      `${BACKEND_URL}/docs/uploads/${user.folderIds.toValidateFolderId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Transmettre</Text>
      </View>
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
      backgroundColor: "#F29231",
      width: width * 0.6,
      height: 100,
      borderRadius: 10,
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green",
      width: width * 0.35,
      height: height * 0.05,
      borderRadius: 10,
    },
    icon2: {
      color: "white",
    },
    pageTitle: {
      color: "white",
      fontSize: 35 / fontScale,
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
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.9,
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
