import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Button,
  ImageBackground
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@env";

const UploadDocumentsScreen = () => {
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
    const res = await fetch(
      `${BACKEND_URL}/docs/uploads/${user.folderIds.toValidateFolderId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        },
        body: uploadFile
      }
    );
    const data = await res.json();
    setResultMessage(data.message);
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/backgrounds/royalBlue.png")}
        style={styles.mainContainer}
      >
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Transmettre</Text>
        </View>
        <View style={styles.listContainer}>
          <TouchableOpacity>
            <Button
              title="Choisir un fichier"
              color="black"
              onPress={pickDocument}
            />
            <Text>{uploadName}</Text>
            <Button title="Envoyer" color="black" onPress={sendDocument} />
            <Text>{resultMessage}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1
    },

    pageTitle: {
      color: "white",
      fontSize: 35 / fontScale,
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
      padding: 10
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.9
    },
    listContainer: {
      height: height,
      justifyContent: "center",
      alignItems: "center"
    }
  });
};

export default UploadDocumentsScreen;
