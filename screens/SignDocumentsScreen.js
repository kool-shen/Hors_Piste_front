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
import { Button, Spinner, Modal, FormControl, Input } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { List } from "react-native-paper";
import { useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import Signature from 'react-native-signature-canvas';
import Sign from '../component/Signature'
import * as Location from 'expo-location';

const MyMissionScreen = () => {
  const styles = makeStyles();
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [documentID, setDocumentID] = useState(null)
  const [signatureModal, setSignatureModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [signature, setSignature] = useState('')
  const [signatureImage, setSignatureImage] = useState('')
  const ref = useRef();

  
  //fetch tous les fichiers dans le drive et les affiches
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://10.2.0.228:3000/docs/listFolder/${user.folderIds.toSignFolderId}`
      );
      const documentsData = await res.json();
      setDocuments(documentsData);
      setLoading(false)
    })();
  }, []);
  const documentsToComponents = documents.map((document, i) => (
    <Sign key={i} ID={document.id} name={document.name}/>
  ));


  return (
      <View style={styles.mainContainer}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Mes documents à signer</Text>
        </View>
        <View style={styles.listContainer}>
                {loading ? <Spinner size='lg' /> : documentsToComponents}
        </View>
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
      // flex: 1,
      // zIndex: -1
      margin: 0,
      display: 'flex',
      justifyContent: 'space-around'
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
      // position: "absolute",
      marginTop: height*0.1,
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "space-between",
      padding: 10
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.9
    },
    card: {
      height: height*0.2,
      width: width,
      // flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signButton: {
      color: 'red',
      backgroundColor: 'red',
      width: width*0.3,
    },
    listContainer: {
      // backgroundColor: 'black',
      width: width,
      flex: 1,
      display: 'flex',
      paddingTop: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    modal: {
      backgroundColor: 'black',
      position: 'relative',
      top: '50%',
      left: '50%',
      // alignItems: 'center',
      // justifyContent: 'center'
    }
  });
};
export default MyMissionScreen;
