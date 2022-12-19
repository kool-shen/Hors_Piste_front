import React from "react";
import { Input, Box } from "native-base";

const MainInput = (props) => {
  return (
    <Box alignItems="center">
      <Input
        variant="filled"
        placeholder={props.label}
        onChangeText={props.onChangeText}
        value={props.value}
        w="75%"
      />
    </Box>
  );
};

export default MainInput;
