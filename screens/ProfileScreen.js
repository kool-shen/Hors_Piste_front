import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
  } from "react-native";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

  import React from "react";
  import avatar from "../assets/avatar.png"
  
  const ProfileScreen = () => {
      return (
          <KeyboardAwareScrollView style={styles.mainContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.mainContainer}>
            <View style={styles.pageTitleContainer}>
              <Text style={styles.pageTitle}>Mon Profil</Text>
              
            </View>
            <View style={styles.background}>
              <View style={styles.subBackground}>
              <Image source={avatar} style={styles.logo} resizeMode="contain" />
              <TouchableOpacity>
                   
          <Text style={styles.change}>Modifier</Text>
        </TouchableOpacity>
     
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Prenom</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Nom</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Adresse</Text>
                  <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}>Mail</Text>
                  <TextInput style={styles.input} />
                </View>
               
                
                </View>
              </View>
            </View>
         </KeyboardAwareScrollView>
        );
      }
      const styles = StyleSheet.create({
        mainContainer: {
          backgroundColor: "#F8DFBD",
          height: "100%",
          width: "100%",
          flex: 1,
          zIndex: -1,
        },
        background: {
          backgroundColor: "#A5D8E6",
          transform: [
            { rotate: "-35deg" },
            { translateX: -100 },
            { translateY: -50 },
          ],
          height: "100%",
          width: 600,
          flex: 1,
          alignItems: "center",
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
        
        inputContainer: {
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        input: {
          backgroundColor: "white",
          height: 40,
          width: 250,
          borderColor: "gray",
          borderWidth: 1,
          placeholderTextColor: "gray",
        },
        inputText: {
          backgroundColor: "#143143",
          maxWidth: 150,
          textAlign: "center",
          fontSize: 15,
          borderRadius: 5,
          color: "white",
          paddingHorizontal: 10,
        },
        pageTitle: {
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
        },
        progression: {
          color: "white",
          fontSize: 15,
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
        validateButton: {
          backgroundColor: "green",
          paddingHorizontal: 40,
          borderRadius: 10,
        },
        validate: {
          color: "white",
          fontWeight: "bold",
          fontSize: 25,
        },
        logo: {
         
          width: "40%",
          height: 120,
          marginLeft:30,
          justifyContent:"center"
        },
        change: {
          
              color: "red",
              
            },
      });
  
  export default ProfileScreen;