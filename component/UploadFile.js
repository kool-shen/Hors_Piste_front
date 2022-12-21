import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";

const UploadFile = (props) => {
  const pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({});
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
