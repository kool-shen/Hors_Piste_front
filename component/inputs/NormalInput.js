import * as React from "react";
import { TextInput } from "react-native-paper";

const NormalInput = (props) => {
  return (
    <TextInput
      outlineStyle={{ borderColor: "#143143" }}
      selectionColor="#143143"
      textColor="black"
      mode="outlined"
      style={{ width: 250, height: 35 }}
      value={props.value}
      onChangeText={props.onChangeText}
      label={props.label}
      h='85%'
      w='85%'
    />
  );
};

export default NormalInput;
