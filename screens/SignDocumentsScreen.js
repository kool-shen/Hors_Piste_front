import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
  Touchable,
  TouchableOpacity
} from "react-native";
import { Button, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sign from "../component/Signature";
import { BACKEND_URL } from "@env";
import BannerScreenTitle from "../component/BannerScreenTitle";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
    <View style={styles.docContainer} key={i}>
      <Sign
        key={i}
        ID={document.id}
        name={document.name}
        fetchToSignDocs={fetchToSignDocs}
      />
    </View>
  ));

  return (
    <ImageBackground
      source={require("../assets/backgrounds/royalBlue.png")}
      style={styles.mainContainer}
    >
      <BannerScreenTitle title={`Signer documents`} />
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? <Spinner size="lg" /> : documentsToComponents}
          {!documentsToComponents.length && (
            <Text style={styles.text}>
              Il n'y a aucun document à signer pour le moment.
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => fetchToSignDocs()}>
              <FontAwesome
                name="refresh"
                size={22}
                style={styles.icon}
                color="white"
              />
            </Button>
          </View>
          {/* <Button
                style={styles.button}
                onPress={() => fetchToSignDocs()}
              >
                Signez le documents
              </Button> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    docContainer: {
      // backgroundColor: "#2D5971",
      // height: height * 0.22,
      width: width * 0.9,
      justifyContent: "space-around",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
      margin: height * 0.01,
      width: width * 0.95
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F29231",
      width: width * 0.15,
      // height: height * 0.05,
      borderRadius: 10,
      marginBottom: height * 0.07,
      
    },
    mainText: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold"
    },
    text: {
      fontSize: 20 / fontScale,
      color: "white"
    },
    mainContainer: {
      height: height,
      width: width,
      margin: 0,
      display: "flex",
      justifyContent: "space-around"
    },
    listContainer: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
      top: height * 0.2,
      marginBottom: height * 0.15
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
      width: width * 0.9,
      // position: "absolute",
      marginTop: height * 0.05,
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "space-between",
      padding: 10
    },
    listItem: {
      padding: 10,
      fontSize: 30,
      width: width * 0.8
    },
    card: {
      // height: height * 0.2,
      width: width,
      // flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    signButton: {
      color: "red",
      backgroundColor: "red",
      width: width * 0.3
    },

    modal: {
      backgroundColor: "black",
      position: "relative",
      top: "50%",
      left: "50%"
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    text: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold"
    }
  });
};
export default MyMissionScreen;
