import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Linking } from "react-native";
import BannerScreenTitle2 from "../component/BannerScreenTitle2";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ContactsScreen = ({navigation}) => {
  const user = useSelector((state) => state.user.value);
  const styles = makeStyles();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/contactBackground.png")}
        style={styles.container}
      >
        <BannerScreenTitle2 title="Mes contacts" icon="address-book" />

        <View style={styles.mainContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.textContainer}>Hors Pistes</Text>
            <Text>______________</Text>
            <View>
              <Text style={styles.nameContainer}>
                {`Référent(e) : ${user.mission.projectReferent.surname} ${user.mission.projectReferent.name}`}
              </Text>
            </View>
            <View style={styles.telContainer}>
              <FontAwesome
                name='phone'
                size={20}
                style={{ color: "white" }}
              />
              <Text
                onPress={() => {
                  Linking.openURL(
                    `tel:${user.mission.projectReferent.phoneNumber}`
                  );
                }}
                style={styles.infoContainer}
              >
                {"   "}
                {user.mission.projectReferent.phoneNumber}
              </Text>
            </View>

            <View style={styles.telContainer}>
              <FontAwesome
                icon='Envelope'
                size={20}
                style={{ color: "white" }}
              />
              <Text
                onPress={() => {
                  Linking.openURL(`mailto:${user.mission.projectReferent.email}`);
                }}
                style={styles.infoContainer}
              >
                {"   "}
                {user.mission.projectReferent.email}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.textContainer}>
              {user.mission.hostStructure.name}
            </Text>

            <Text>______________</Text>
            <View>
              <Text style={styles.nameContainer}>
                {`Référent(e) : ${user.mission.hostStructure.projectReferent.surname} ${user.mission.hostStructure.projectReferent.name}`}
              </Text>
            </View>

            <View style={styles.telContainer}>
              <FontAwesome
                name='phone'
                size={20}
                style={{ color: "white" }}
              />
              <Text
                onPress={() => {
                  Linking.openURL(
                    `tel:${user.mission.hostStructure.projectReferent.phoneNumber}`
                  );
                }}
                style={styles.infoContainer}
              >
                {"   "}
                {user.mission.hostStructure.projectReferent.phone}
              </Text>
            </View>

            <View style={styles.telContainer}>
              <FontAwesome
                name='envelope'
                size={20}
                style={{ color: "white" }}
              />
              <Text
                onPress={() => {
                  Linking.openURL(
                    `mailto:${user.mission.hostStructure.projectReferent.email}`
                  );
                }}
                style={styles.infoContainer}
              >
                {"   "}
                {user.mission.hostStructure.projectReferent.email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={styles.footer}
        >
        <FontAwesome name='home' size={40} style={{color: 'orange'}} onPress={() => navigation.navigate('TabNavigator')}/>
        </View> 
      </ImageBackground>
    </View>
  );
};
const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
    },
    cardContainer: {
      backgroundColor: "#2D5971",
      height: height * 0.22,
      width: width * 0.9,
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'space-around',
      padding: 10,
      margin: height * 0.01,
      width: width * 0.95,
    },
    textContainer: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
    infoContainer: {
      fontSize: 18,
      justifyContent: "space-around",
      textAlign: "center",
      textDecorationLine: "underline",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      color: "white",
      // padding: 10,
    },
    nameContainer: {
      color: "white",
      fontSize: 18,
      justifyContent: "space-between",
      textAlign: "center",
      display: "flex",
    },
    mainContainer: {
      paddingTop: height * 0.25,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      textAlign: "center",
      height: height * 0.8,
    },
    telContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      position: "absolute",
      top: height*0.88,
      height: height*0.12,
      width: width,
      backgroundColor: '#2D5971',
      marginBottom: 0,
    }
  });
};

export default ContactsScreen;
