import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";

const BannerScreenTitle2 = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#2D5971",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 90,
        maxWidth: "110%",
        position: "absolute",
        top: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        {props.title}
        {"  "}
      </Text>
      <FontAwesome name={props.icon} size={40} color="#F29231" />

      <Text
        style={{
          color: "white",
          fontSize: 15,
          alignSelf: "flex-end",
        }}
      >
        {props.progressionStep && `${props.progressionStep}/6`}
      </Text>
    </View>
  );
};

export default BannerScreenTitle2;
