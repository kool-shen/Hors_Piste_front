import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.card1}>
          <Text>Mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.card2}>
          <Text>Mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.card1}>
          <Text>Mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container4}>
        <TouchableOpacity style={styles.card2}>
          <Text>Mes documents</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container5}>
        <TouchableOpacity style={styles.card1}>
          <Text>Mes documents</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F8DFBD",
    height: "100%",
    width: "100%",
    flex: 1,
    zIndex: -1,
  },
  card1: {
    backgroundColor: "#A5D8E6",
    transform: [{ rotate: "13deg" }],
    width: 200,
    height: 70,
    borderRadius: 20,
  },
  card2: {
    backgroundColor: "#A5D8E6",
    transform: [{ rotate: "-13deg" }],
    width: 200,
    height: 70,
    borderRadius: 10,
  },
  container1: {
    height: "20%",
    backgroundColor: "#F29231",
    transform: [{ rotate: "-13deg" }, { translateX: -19 }],
    width: 450,
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "#143143",
    height: "20%",
    transform: [{ rotate: "13deg" }, { translateX: -22 }, { translateY: 13 }],
    width: 450,
    zIndex: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    backgroundColor: "#F29231",
    height: "20%",
    transform: [{ rotate: "-13deg" }, { translateX: -21 }],
    width: 450,
    zIndex: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container4: {
    backgroundColor: "#143143",
    height: "20%",
    transform: [{ rotate: "13deg" }, { translateX: -20 }],
    width: 450,
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container5: {
    backgroundColor: "#F29231",
    height: "20%",
    transform: [{ rotate: "-13deg" }, { translateX: -21 }],
    width: 450,
    zIndex: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
