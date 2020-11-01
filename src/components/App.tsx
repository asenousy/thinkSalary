import React, { useReducer } from "react";
import SegmentedControl from "@react-native-community/segmented-control";
import { Picker } from "@react-native-community/picker";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LabeledOutput from "./LabeledOutput";
import Details from "./Details";

const initialState = { salary: 0, pensionRate: 0, allowance: 0 };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "updateSalary":
      return { ...state, salary: action.value };
    case "formatSalary":
      let formatted = (+state.salary).toFixed(2);
      formatted = state.salary.endsWith(".00")
        ? state.salary.split(".").shift()
        : formatted;
      return { ...state, salary: formatted };
    default:
      throw new Error("no such action exist");
  }
};

const timeUnits = ["Annual", "Monthly", "Weekly", "Daily", "Hourly"];

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.salary}>
            <Text style={styles.label}>Salary:</Text>
            <TextInput
              style={styles.input}
              value="2500"
              keyboardType="numeric"
              clearButtonMode={"while-editing"}
              onFocus={() => dispatch({ type: "formatSalary" })}
              onEndEditing={() => dispatch({ type: "formatSalary" })}
              onChange={(value) => dispatch({ type: "updateSalary", value })}
            />
            <Picker selectedValue={timeUnits[1]} itemStyle={styles.picker}>
              {timeUnits.map((timeUnit) => (
                <Picker.Item
                  key={`picker-${timeUnit}`}
                  label={timeUnit}
                  value={timeUnit}
                />
              ))}
            </Picker>
          </View>
          <SegmentedControl
            style={styles.segment}
            values={timeUnits}
            selectedIndex={0}
            // onChange={(event) => {
            //   this.setState({
            //     selectedIndex: event.nativeEvent.selectedSegmentIndex,
            //   });
            // }}
          />
          <Details />
          <LabeledOutput
            label="Take Home:"
            // value={"£ " + netSelector(state).toFixed(2)}
            value="£ 1500"
          />
        </View>
        <View style={styles.footer}>
          <Ionicons name="ios-mail" size={36} color="dodgerblue" />
          <Ionicons name="ios-settings" size={36} color="dodgerblue" />
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
