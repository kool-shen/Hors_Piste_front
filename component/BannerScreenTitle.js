import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { View, Text } from "react-native";

const BannerScreenTitle = (props) => {
  let progression = ''
  if (props.progressionStep) {
    const progression = 
    <Text
    style={{
      color: "white",
      fontSize: 15,
      alignSelf: "flex-end",
    }}
  >
    {props.progressionStep}/6
  </Text>
  } 

  return (
    <View
      style={{
        backgroundColor: "#2D5971",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 90,
        width: "80%",
        position: "absolute",
        top: '10%',
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
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        {props.title}
      </Text>
      <FontAwesomeIcon icon={faUser} color="#F29231" size={40} />

        {progression}

    </View>
  );
};

export default BannerScreenTitle;
