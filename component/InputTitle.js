import { Text, View, TouchableOpacity } from "react-native";

export default function InputTitle(props) {
  return (
    <>
      <Text
        style={{
          backgroundColor: "#143143",
          maxWidth: 150,
          textAlign: "center",
          fontSize: 15,
          borderRadius: 5,
          color: "white",
          paddingHorizontal: 10,
        }}
      >
        {props.title}
      </Text>
    </>
  );
}
