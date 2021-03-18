import React, { useState } from "react";
import { Picker } from "@react-native-community/picker";
import { View, TextInput, Platform, StyleSheet } from "react-native";
import { responsive, format } from "../helpers";
import { colours } from "../constants.json";

type SalaryInputProps = {
  onSalaryChange: (salary: string) => void;
  timeUnit: number;
  timeUnits: string[];
  onTimeUnitChange: (timeUnit: number) => void;
};

const SalaryInput = (props: SalaryInputProps) => {
  const [inputSalary, setInputSalary] = useState("");
  return (
    <View style={styles.salary}>
      <TextInput
        style={styles.input}
        value={inputSalary}
        placeholder="Enter Salary..."
        keyboardType="numeric"
        clearButtonMode={"while-editing"}
        onChangeText={(text) => setInputSalary(text)}
        onFocus={() =>
          setInputSalary(inputSalary.replace(",", "").replace("£", ""))
        }
        onEndEditing={({ nativeEvent }) => {
          const formatted = format(nativeEvent.text).replace(".00", "");
          setInputSalary(formatted === "£0" ? "" : formatted);
          props.onSalaryChange(nativeEvent.text);
        }}
      />
      <Picker
        style={Platform.OS === "android" ? { width: 120 } : {}}
        mode="dropdown"
        selectedValue={props.timeUnit}
        itemStyle={styles.pickerItem}
        onValueChange={(val, i) => props.onTimeUnitChange(i)}
      >
        {props.timeUnits.map((timeUnit, i) => (
          <Picker.Item key={`picker-${timeUnit}`} label={timeUnit} value={i} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create(
  responsive({
    salary: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      margin: 5,
      fontSize: 15,
      borderRadius: 2,
      borderWidth: 0.3,
      borderColor: colours.border,
      backgroundColor: "white",
      textAlign: "center",
      height: 30,
      width: 120,
    },
    pickerItem: {
      margin: 5,
      fontSize: 15,
      width: 100,
      height: 120,
    },
  })
);

export default SalaryInput;
