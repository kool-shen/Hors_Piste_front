import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Linking,
  Button
} from "react-native";
import React, { useState } from "react";
import { List } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
// import RNFetchBlob from "rn-fetch-blob";
import { useSelector } from "react-redux";
import axios from "axios";

const UploadDocumentsScreen = () => {
  const user = useSelector(state => state.user.value)
  const [uploadFile, setUploadFile] = useState({})
  const [uploadName, setUploadName] = useState('')
  const [resultMessage, setResultMessage] = useState('')

  const styles = makeStyles();
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    setUploadName(result.name)
    const formData = new FormData();
    formData.append("document", {...result, type: 'image/jpeg'});  
    setUploadFile(formData)
  };

  const sendDocument = async () => {
    const res = await fetch(`http://10.2.1.233:3000/docs/uploads/${user.folderIds.toValidateFolderId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: uploadFile,
    })
    const data = await res.json()
    setResultMessage(data.message)
  };
    

  

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.mainContainer}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Transmettre</Text>
        </View>
        <View style={styles.background}>
          <View style={styles.subBackground}>
            <View>
              <View style={styles.listContainer}>
                <TouchableOpacity>
                  <Button
                    title="Choisir un fichier"
                    color="black"
                    onPress={pickDocument}
                  />
                  <Text>{uploadName}</Text>
                  <Button
                    title="Envoyer"
                    color="black"
                    onPress={sendDocument}
                  />
                  <Text>{resultMessage}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const makeStyles = () => {
  const { fontScale, width } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: "100%",
      width: "100%",
      flex: 1,
      zIndex: -1
    },
    background: {
      backgroundColor: "#A5D8E6",
      transform: [
        { rotate: "-35deg" },
        { translateX: -100 },
        { translateY: -50 }
      ],
      height: "100%",
      width: 600,
      flex: 1,
      alignItems: "center"
    },
    subBackground: {
      transform: [{ rotate: "35deg" }, { translateX: 9 }, { translateY: -16 }],
      height: "100%",
      width: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 130,
      paddingBottom: 20
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
    listContainer: {}
  });
};

export default UploadDocumentsScreen;