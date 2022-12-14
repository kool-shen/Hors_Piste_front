import * as React from "react";
import { TextInput } from "react-native-paper";

const PasswordInput = (props) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
      outlineStyle={{ borderColor: "#143143" }}
      selectionColor="#143143"
      textColor="black"
      mode="outlined"
      style={{ width: 250, height: 35 }}
      label={props.label}
      onChangeText={props.onChangeText}
    />
  );
};

export default PasswordInput;
