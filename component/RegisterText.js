import { Text, View, useWindowDimensions, StyleSheet } from "react-native";

export default function RegisterText(props) {
    const styles = makeStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.text}
      </Text>
    </View>
  );

}
const makeStyles = () => {
  const { fontScale, height, width } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      backgroundColor: "#143143",
      minWidth: 150,
      paddingHorizontal: 10,
      borderRadius: 5, 
      fontSize: 15 / fontScale,
      whiteSpace: "nowrap",
      margin: 10,
      
    },
    text: {
        color: "white",
        textAlign: "center",
    },
  })
}
