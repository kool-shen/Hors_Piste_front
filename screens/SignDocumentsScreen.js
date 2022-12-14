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
import { useSelector, useDispatch } from "react-redux";
import { updateUserProperties } from "../reducers/user";
import Sign from "../component/Signature";
import { BACKEND_URL } from "@env";
import BannerScreenTitle from "../component/BannerScreenTitle2";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const MyMissionScreen = () => {
  const dispatch = useDispatch();
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
      `${BACKEND_URL}/docs/listFolder/${user.folderIds.toSignFolderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.token}`
        }
      }
    );
    const documentsData = await res.json();
    setDocuments(documentsData);
    dispatch(updateUserProperties({ nbOfToSignDocs: documentsData.length }));
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
      <BannerScreenTitle icon="pencil" title={`Signer documents`} />
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? <Spinner size="lg" /> : documentsToComponents}
          {!documentsToComponents.length && (
            <Text style={styles.text}>
              Il n'y a aucun document ?? signer pour le moment.
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const makeStyles = () => {
  const { fontScale, width, height } = useWindowDimensions();
  return StyleSheet.create({
    docContainer: {
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
      marginBottom: height * 0.07
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
    text: {
      fontSize: 20 / fontScale,
      color: "white",
      fontWeight: "bold"
    }
  });
};
export default MyMissionScreen;
