import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  Linking,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Spinner, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@env";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BannerScreenTitle from "../component/BannerScreenTitle";

const MyDocumentsScreen = () => {
  const styles = makeStyles();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchCompleteDocs();
  }, []);

  const fetchCompleteDocs = async () => {
    setLoading(true);
    const res = await fetch(
      `${BACKEND_URL}/docs/listFolder/${user.folderIds.completeFolderId}`
    );
    const documentsData = await res.json();
    setDocuments(documentsData);
    setLoading(false);
  };

  console.log(documents);
  const documentsToComponents = documents.map((document, i) => (
    <View style={styles.docContainer}>
      <Text
        key={i}
        style={styles.docText}
        onPress={() =>
          Linking.openURL(`https://docs.google.com/document/d/${document.id}`)
        }
      >
        <FontAwesome name="arrow-right" size={20} style={styles.icon} />
        {document.name}
      </Text>
    </View>
  ));
  return (
    <ImageBackground
      source={require("../assets/backgrounds/royalBlue.png")}
      style={styles.mainContainer}
    >
      <BannerScreenTitle title="Mes documents" />
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? <Spinner size="lg" /> : documentsToComponents}
          {!documentsToComponents.length && (
            <Text style={styles.text}>
              Il n'y a aucun document à afficher pour le moment.
            </Text>
          )}
          <Button style={styles.button} onPress={() => fetchCompleteDocs()}>
            <Text style={styles.text}>Actualiser</Text>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    docContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-start",
      width: width * 0.9,
    },
    docText: {
      fontSize: 20,
      fontWeight: "light",
      color: "white",
      textAlign: "left",
    },
    mainContainer: {
      backgroundColor: "#F8DFBD",
      height: height,
      width: width,
      flex: 1,
      zIndex: -1,
    },
    text: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold",
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
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F29231",
      width: width * 0.35,
      height: height * 0.05,
      borderRadius: 10,
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      margin: 15,
      width: width * 0.9,
    },
    listContainer: {
      height: height,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
export default MyDocumentsScreen;
