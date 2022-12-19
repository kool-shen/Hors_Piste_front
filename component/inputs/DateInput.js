import React, { useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { updateUserProperties } from "../../reducers/user";

const DateInput = (props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    dispatch(updateUserProperties({ birthDate: currentDate.split("T")[0] }));
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.text}>Sélectionne ta date de naissance</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    width: 300,
    height: 40,
    backgroundColor: "white",
    paddingLeft: 10,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "light",
    color: "grey",
  },
});

export default DateInput;
