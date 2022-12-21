import React, {useState} from "react";
import { Input, Box, Button } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box alignItems="center" >
      <Input
        type={show ? "text" : "password"}
        // secureTextEntry={true}
        variant="filled"
        placeholder={props.label}
        onChangeText={props.onChangeText}
        value={props.value}
        w="85%"
        h='85%'
        InputRightElement={<Button size="xs" style={{backgroundColor:"#143143"}} rounded="none" w="1/6" h="full" onPress={handleClick}>
        <FontAwesome name={show ? "eye" : "eye-slash"} size={25} color='white' />
      </Button>}
      />
    </Box>
  );
};



export default PasswordInput;