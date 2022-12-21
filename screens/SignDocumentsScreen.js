import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Button, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sign from "../component/Signature";
import { BACKEND_URL } from "@env";

const MyMissionScreen = () => {
  const styles = makeStyles();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const user = useSelector((state) => state.user.value);

  //fetch tous les fichiers dans le drive et les affiches
  useEffect(() => {
    fetchToSignDocs();
  }, []);

  const fetchToSignDocs = async () => {
    setLoading(true);

    const res = await fetch(
      `${BACKEND_URL}/docs/listFolder/${user.folderIds.toSignFolderId}`
    );
    const documentsData = await res.json();
    setDocuments(documentsData);
    setLoading(false);
  };

  const documentsToComponents = documents.map((document, i) => (
    <Sign
      key={i}
      ID={document.id}
      name={document.name}
      fetchToSignDocs={fetchToSignDocs}
    />
  ));

  return (
    <ImageBackground
      source={require("../assets/backgrounds/lightBlue.png")}
      style={styles.mainContainer}
    >
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Mes documents{"\n"}à signer</Text>
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? <Spinner size="lg" /> : documentsToComponents}
          {!documentsToComponents.length && (
            <Text style={styles.text}>
              Il n'y a aucun document à signer pour le moment.
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => fetchToSignDocs()}
          >
            <Text style={styles.mainText}>Actualiser</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2D5971",
      width: width * 0.35,
      height: height * 0.05,
      borderRadius: 10,
    },
    mainText: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold",
    },
    text: {
      fontSize: 20 / fontScale,
    },
    mainContainer: {
      height: height,
      width: width,
      margin: 0,
      display: "flex",
      justifyContent: "space-around",
    },
    listContainer: {
      height: height * 0.25,
      alignItems: "center",
      display: "flex",
      justifyContent: "space-around",
      //top: height * 0.25,
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
      width: width * 0.9,
      // position: "absolute",
      marginTop: height * 0.05,
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "space-between",
      padding: 10,
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.8,
    },
    card: {
      height: height * 0.2,
      width: width,
      // flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    signButton: {
      color: "red",
      backgroundColor: "red",
      width: width * 0.3,
    },

    modal: {
      backgroundColor: "black",
      position: "relative",
      top: "50%",
      left: "50%",
      // alignItems: 'center',
      // justifyContent: 'center'
    },
  });
};
export default MyMissionScreen;
