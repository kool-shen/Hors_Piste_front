import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState , useEffect} from "react";
import * as Mail from "expo-mail-composer";

const EMail = () => {
  const mail = async () => {
    const result = await Mail.isAvailableAsync({});
    if (result) {const MailModal = Mail.composeAsync({}) }
    console.log(MailModal)
  };






  



  return (
    <View>
      <Text style={styles.file}> 
        Mail
        <View style={styles.button}>
          <TouchableOpacity>
            <Button title="E-mail" color="black" onPress={mail} />
          </TouchableOpacity>
        </View>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  file: {
    color: "black",
    marginHorizontal: 145,
  },
  button: {
    marginHorizontal: 60,
  },
});

export default EMail;
