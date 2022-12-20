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

const Sign = (props) => {
  const toast = useToast();
  const styles = makeStyles();
  const [signatureModal, setSignatureModal] = useState(false);
  const [infoModal, setInfoModal] = useState(true);
  const [inputModal, setInputModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [signature, setSignature] = useState("");
  const [signatureImage, setSignatureImage] = useState("");
  const [signatureLocation, setSignatureLocation] = useState(null);
  const [documentID, setDocumentID] = useState("");
  const ref = useRef();

  const [location, setLocation] = useState(null);

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
        "Content-Type": "multipart/form-data"
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
        <>
          <Modal isOpen={inputModal} onClose={() => setInputModal(!inputModal)}>
            <Input
              placeholder="fait à..."
              style={styles.input}
              onChangeText={(value) => setSignatureLocation(value)}
            ></Input>
            <Text style={styles.input}>Le {date}</Text>
            <Button
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
              style={styles.listItem}
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
                style={styles.signButton}
                onPress={() => {
                  console.log("test");

                  setInputModal(!inputModal);
                }}
                disabled={infoModal}
              >
                Sign document
              </Button>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: height,
      width: width,
      margin: 0,
      display: "flex",
      justifyContent: "space-around"
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
      height: height,
      width: width,
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
      width: "100%",
      marginTop: height * 0.1,
      padding: 10
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.9
    },
    card: {
      height: height * 0.2,
      width: width,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    signButton: {
      color: "red",
      backgroundColor: "red",
      width: width * 0.3
    },
    listContainer: {
      width: width,
      flex: 1,
      display: "flex",
      paddingTop: 20
    },
    modal: {
      backgroundColor: "black",
      position: "relative",
      top: "50%",
      left: "50%"
    },
    input: {
      backgroundColor: "white"
      // borderBottomRightRadius: 'none',
      // borderBottomEndRadius: 'none'
    }
  });
};

export default Sign;
