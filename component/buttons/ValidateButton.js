import * as React from "react";
import { Button } from "react-native-paper";

const ValidateButton = (props) => (
  <Button
    buttonColor="green"
    mode="contained"
    contentStyle={{ width: 120 }}
    labelStyle={{ fontSize: 20, display: "flex", justifyContent: "center" }}
    onPress={props.onPress}
  >
    Valider
  </Button>
);

export default ValidateButton;
