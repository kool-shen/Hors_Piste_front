import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Linking,
  Pressable
} from "react-native";
import {
  Button,
  Spinner,
  Modal,
  FormControl,
  Input,
  useToast
} from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { List } from "react-native-paper";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import Signature from "react-native-signature-canvas";
import * as Location from "expo-location";
import { BACKEND_URL } from "@env";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Sign = (props) => {
  const toast = useToast();
  const styles = makeStyles();
  const [signatureModal, setSignatureModal] = useState(false);
  const [infoModal, setInfoModal] = useState(true);
  const [inputModal, setInputModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState("");
  const [documentID, setDocumentID] = useState("");
  const [location, setLocation] = useState(null);

  const ref = useRef();
  const user = useSelector((state) => state.user.value);

  let date = new Date();
  date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    setSignature(signature);
    //onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = async (data) => {
    setLoading(true);
    const formData = new FormData();
    const path = FileSystem.cacheDirectory + "sign.png";
    const encoding = await FileSystem.writeAsStringAsync(
      path,
      data.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    );
    const file = await FileSystem.getInfoAsync(path);
    console.log(file);

    formData.append("photoFromFront", {
      uri: file.uri,
      name: "photo.png",
      type: "image/png"
    });
    formData.append("documentID", documentID);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("completeFolder", user.folderIds.completeFolderId);
    formData.append("toSignFolder", user.folderIds.toSignFolderId);
    fetch(`${BACKEND_URL}/signature/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `bearer ${user.token}`
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.moveDoc.status === 200) {
          toast.show({
            description: "Le fichier à bien été signé"
          });
        }
        setLoading(false);
        props.fetchToSignDocs();
      });

    setSignatureModal(!signatureModal);
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: #A5D8E6;
      color: #FFF;
    }
    body {
      font-family: Helvetica, Sans-Serif;
      background-color: #F8DFBD;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }`;

  return (
    <View>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <View style={styles.containerGlobal}>
          <Modal
            style={styles.modalContainer}
            isOpen={inputModal}
            onClose={() => setInputModal(!inputModal)}
          >
            <Input
              placeholder="Fait à..."
              style={styles.input}
              onChangeText={(value) => setLocation(value)}
            ></Input>
            <Text style={styles.input}>Le {date}</Text>
            <Button
              style={styles.button}
              onPress={() => {
                setInputModal(!inputModal);
                setSignatureModal(!signatureModal);
              }}
            >
              Valider
            </Button>
          </Modal>
          <Modal
            isOpen={signatureModal}
            onClose={() => setSignatureModal(!signatureModal)}
          >
            <View
              style={{
                position: "absolute",
                top: "20%",
                height: "50%",
                width: "90%"
              }}
            >
              <Signature
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onGetData={() => handleData(signature)}
                autoClear={false}
                descriptionText="sign here"
                webStyle={style}
              />
            </View>
          </Modal>

          <View style={styles.card}>
            <Button
              size="lg"
              style={styles.buttonDoc}
              onPress={() => {
                Linking.openURL(
                  `https://docs.google.com/document/d/${props.ID}`
                );
                setDocumentID(props.ID);
                setInfoModal(false);
              }}
            >
              {props.name}
            </Button>
            <Pressable
              onPress={() => {
                if (infoModal) {
                  toast.show({
                    description: "Veuillez lire le document avant de le signer."
                  });
                }
              }}
            >
              <Button
                style={styles.button}
                onPress={() => {
                  setInputModal(!inputModal);
                }}
                disabled={infoModal}
              >
                Signez le document
              </Button>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    containerGlobal: {
      // height: height,
      width: width,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F29231",
      // width: width * 0.35,
      // height: height * 0.05,
      borderRadius: 10,
      marginTop: 5
    },
    buttonDoc: {
      fontSize: 18,
      fontWeight: "light",
      color: "white",
      textAlign: "left",
      borderRadius: 10,
      width: width * 0.85,
      backgroundColor: "#2D5971"
    },
    card: {
      width: width * 0.9,
      justifyContent: "center",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 5,
      width: width * 0.95
    },
    modal: {
      backgroundColor: "black",
      position: "relative",
      top: "50%",
      left: "50%"
    },
    input: {
      padding: 15,
      borderRadius: 10,
      margin: 10,
      border: "none",
      color: "white",
      fontSize: fontScale * 20
    },
    modalContainer: {
      backgroundColor: "#2D5971",
      height: "auto",
      borderRadius: 10,
      marginTop: height * 0.4,
      padding: 25,
      width: width
    }
  });
};

export default Sign;
