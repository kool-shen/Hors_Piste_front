import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { TouchableOpacity, View } from "react-native";

const NextPrevious = (props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={()=> props.nextStep(-1)}>
        <FontAwesome name="arrow-left" size={50} color="#143143" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> props.handleValidate()}>
        <FontAwesome name="arrow-right" size={50} color="#143143" />
      </TouchableOpacity>
    </View>
  );
};

export default NextPrevious;
