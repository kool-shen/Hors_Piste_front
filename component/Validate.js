import { Text, View, TouchableOpacity } from "react-native";

export default function Validate(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.handleClick();
        }}
        style={{
          backgroundColor: "green",
          paddingHorizontal: 40,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
          Valider
        </Text>
      </TouchableOpacity>
    </View>
  );
}
