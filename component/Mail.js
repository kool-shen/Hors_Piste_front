import {  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,} from 'react-native'
  import React, { useState } from "react";
  import * as Mail from 'expo-mail-composer';


const Mail = () => {
  const mail= async () =>{
    const result = await Mail.goMailAsync({});
    console.log(result);
  };

  
  return (
    <View>
      <Text style={styles.file}>
        Mail
        <View style={styles.button}>
          <TouchableOpacity>
            <Button
              title="E-mail"
              color="black"
              onPress={mail}
            />
          </TouchableOpacity>
        </View>
      </Text>
    </View>
  );
  }
const styles = StyleSheet.create({
  file: {
    color: "black",
    marginHorizontal: 145,
  },
  button: {
    marginHorizontal: 60,
  },
});


export default Mail









