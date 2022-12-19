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

const UploadFile = () => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
  };

  return (
    <View>
      <Text style={styles.file}>
        Upload file
        <View style={styles.button}>
          <TouchableOpacity>
            <Button
              title="upload your file"
              color="black"
              onPress={pickDocument}
            />
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

export default UploadFile;





