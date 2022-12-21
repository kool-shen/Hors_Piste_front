import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  Linking,
  ImageBackground,
  ScrollView
} from "react-native";
import { Spinner, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@env";
import { useSelector } from "react-redux";

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
    <Button
      key={i}
      style={styles.listItem}
      onPress={() =>
        Linking.openURL(`https://docs.google.com/document/d/${document.id}`)
      }
    >
      {document.name}
    </Button>
  ));
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/backgrounds/orange.png")}
        style={styles.mainContainer}
      >
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>Mes documents</Text>
        </View>
        <ScrollView>
          <View style={styles.listContainer}>
            {loading ? <Spinner size="lg" /> : documentsToComponents}
            {!documentsToComponents.length && (
              <Text>Il n'y a aucun document à afficher pour le moment.</Text>
            )}
            <Button onPress={() => fetchCompleteDocs()}>Actualiser</Button>
          </View>
        </ScrollView>
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
    listContainer: {
      marginTop: height*0.05,
      height: height,
      justifyContent: "center",
      alignItems: "center"
    }
  });
};
export default MyDocumentsScreen;
