import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { View, Text } from "react-native";

const BannerScreenTitle = (props) => {

  return (
    <View
      style={{
        backgroundColor: "#2D5971",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 90,
        maxWidth: "110%",
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
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        {props.title}
      {'  '}
      </Text>
      {props.progressionStep && <FontAwesomeIcon icon={faUser} color="#F29231" size={40} />}

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

export default BannerScreenTitle;
