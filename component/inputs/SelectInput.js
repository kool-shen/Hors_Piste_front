import React from "react";
import {
  _selectedItem,
  FormControl,
  Center,
  Select,
  WarningOutlineIcon,
  CheckIcon,
} from "native-base";

const SelectInput = (props) => {
  const placeHolderLowerCased = props.label.toLowerCase();

  return (
    <Center>
      <FormControl w="3/4" maxW="300" isRequired isInvalid>
        <Select
          bgColor="white"
          minWidth="300"
          accessibilityLabel={`Sélectionne ${placeHolderLowerCased}`}
          placeholder={`Sélectionne ${placeHolderLowerCased}`}
          _selectedItem={{
            bg: "white",
            endIcon: <CheckIcon size={6} />,
          }}
          mt="1"
          onValueChange={props.onValueChange}
          value={props.value}
          label={props.label}
        >
          <Select.Item label="Chômeur" value="Chômeur" />
          <Select.Item label="Branleur" value="Branleur" />
          <Select.Item label="Gros chill" value="Gros chill" />
          <Select.Item label="Pépouze" value="Pépouze" />
          <Select.Item label="OKLM" value="OKLM" />
        </Select>
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
        ></FormControl.ErrorMessage>
      </FormControl>
    </Center>
  );
};

export default SelectInput;
