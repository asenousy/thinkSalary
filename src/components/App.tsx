import React, { useReducer, useState } from "react";
import SegmentedControl from "@react-native-community/segmented-control";
import { Picker } from "@react-native-community/picker";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LabeledOutput from "./LabeledOutput";
import Details from "./Details";
import Configs from "./Configs";
import calculate from "../calculator";

const timeUnitsScales = {
  Annual: 1,
  Monthly: 12,
  Weekly: 52,
  Daily: 260,
  Hourly: 2080,
};
const timeUnits = Object.keys(timeUnitsScales);
const scaleUnits = Object.values(timeUnitsScales);

function currency(figure: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(figure);
}
function format(input: any) {
  if (typeof input === "number") return currency(input);
  return Object.entries(input).reduce((fixed, [key, value]) => {
    fixed[key] = currency(value as number);
    return fixed;
  }, {} as any);
}

export default function App() {
  const [salary, setSalary] = useState("0");
  const [segment, setSegment] = useState(0);
  const [picker, setPicker] = useState(0);
  const [showConfigs, setShowConfigs] = useState(false);
  const [configs, setConfings] = useState({
    loanPlan: 0,
    pensionRate: "0",
    scotlandTax: false,
  });
  const annualSalary = +salary * scaleUnits[picker];
  const unit = scaleUnits[segment];
  const { net, ...details } = calculate(
    annualSalary,
    +configs.pensionRate,
    configs.loanPlan,
    unit
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Configs
          visible={showConfigs}
          configs={configs}
          onBackgroundPress={() => setShowConfigs(!showConfigs)}
          onChange={(name, value) => setConfings({ ...configs, [name]: value })}
        />
        <View style={styles.center}>
          <View style={styles.salary}>
            <Text style={styles.label}>Salary:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              clearButtonMode={"while-editing"}
              onEndEditing={({ nativeEvent }) => setSalary(nativeEvent.text)}
            />
            <Picker
              selectedValue={picker}
              itemStyle={styles.picker}
              onValueChange={(val, i) => setPicker(i)}
            >
              {timeUnits.map((timeUnit, i) => (
                <Picker.Item
                  key={`picker-${timeUnit}`}
                  label={timeUnit}
                  value={i}
                />
              ))}
            </Picker>
          </View>
          <SegmentedControl
            style={styles.segment}
            values={timeUnits}
            selectedIndex={segment}
            onChange={({ nativeEvent }) =>
              setSegment(nativeEvent.selectedSegmentIndex)
            }
          />
          <Details figures={format(details)} />
          <LabeledOutput label="Take Home:" value={format(net)} />
        </View>
        <View style={styles.footer}>
          <Ionicons name="ios-mail" size={36} color="dodgerblue" />
          <Pressable onPress={() => setShowConfigs((prev) => !prev)}>
            <Ionicons name="ios-settings" size={36} color="dodgerblue" />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
  },
  center: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  footer: {
    zIndex: 2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "aliceblue",
  },
  segment: {
    margin: 20,
    width: 300,
  },
  salary: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    fontSize: 15,
    width: 100,
    height: 120,
  },
  label: {
    fontSize: 15,
  },
  input: {
    margin: 20,
    fontSize: 15,
    borderRadius: 2,
    borderWidth: 0.3,
    borderColor: "dodgerblue",
    backgroundColor: "white",
    textAlign: "center",
    height: 30,
    width: 120,
  },
});
