import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

const UploadFile = (props) => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
  };

  return (
    <View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button title={props.title} color="#F29231" onPress={pickDocument} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default UploadFile;
