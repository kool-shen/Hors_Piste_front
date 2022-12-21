import React from "react";
import { Input, Box } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const PhoneInput = (props) => {
  return (
    <Box alignItems="center">
      <Input
        variant="filled"
        placeholder={props.label}
        onChangeText={props.onChangeText}
        value={props.value}
        w="85%"
        h='85%'
        size="lg"
        InputLeftElement={
          <FontAwesome
              name="phone"
              size={25}
              color="black"
              m={5}
            />
        }
      />
    </Box>
  );
};

export default PhoneInput;
