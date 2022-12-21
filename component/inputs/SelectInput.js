import React from "react";
import {
  _selectedItem,
  FormControl,
  Center,
  Select,
  WarningOutlineIcon,
  CheckIcon,
} from "native-base";
import { useWindowDimensions } from "react-native";

const SelectInput = (props) => {
  const placeHolderLowerCased = props.label.toLowerCase();
  const { width } = useWindowDimensions()
  return (
    <Center>
      <FormControl w={width*0.85} isRequired isInvalid>
        <Select
          bgColor="white"
          minWidth="300"
          accessibilityLabel={`Sélectionne ${placeHolderLowerCased}`}
          placeholder={`Sélectionne ${placeHolderLowerCased}`}
          _selectedItem={{
            bg: "white",
            endIcon: <CheckIcon size={props.numberOfSelections} />,
          }}
          mt="1"
          onValueChange={props.onValueChange}
          value={props.value}
          label={props.label}
          numberOfSelections={props.numberOfSelections}
        >
          {props.label1 && <Select.Item label={props.label1} value={props.label1} />}
          {props.label2 && <Select.Item label={props.label2} value={props.label2} />}
          {props.label3 && <Select.Item label={props.label3} value={props.label3} />}
          {props.label4 && <Select.Item label={props.label4} value={props.label3} />}
          {props.label5 && <Select.Item label={props.label5} value={props.label5} />}
          {props.label6 && <Select.Item label={props.label6} value={props.label6} />}
          {props.label7 && <Select.Item label={props.label7} value={props.label7} />}
        </Select>
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
        ></FormControl.ErrorMessage>
      </FormControl>
    </Center>
  );
};

export default SelectInput;
