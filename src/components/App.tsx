import "intl";
import "intl/locale-data/jsonp/en";
import React, { useState } from "react";
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
  Platform,
} from "react-native";
import { colours } from "../constants.json";
import { Feather } from "@expo/vector-icons";
import Details from "./Details";
import Configs from "./Configs";
import calculate from "../calculator";
import ContactUs from "./ContactUs";

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
  const [showContactUs, setShowContactUs] = useState(false);
  const [configs, setConfings] = useState({
    loanPlan: 0,
    pensionRate: "0",
    scotlandTax: false,
  });
  const annualSalary = +salary * scaleUnits[picker];
  const unit = scaleUnits[segment];
  const { net, ...details } = calculate({
    salary: annualSalary,
    scotlandTax: configs.scotlandTax,
    pensionRate: +configs.pensionRate,
    loanPlan: configs.loanPlan,
    unit: unit,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.salary}>
            <TextInput
              style={styles.input}
              placeholder="Enter Salary..."
              keyboardType="numeric"
              clearButtonMode={"while-editing"}
              onEndEditing={({ nativeEvent }) => setSalary(nativeEvent.text)}
            />
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={picker}
              itemStyle={styles.pickerItem}
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
            fontStyle={{ fontSize: 13 }}
            selectedIndex={segment}
            onChange={({ nativeEvent }) =>
              setSegment(nativeEvent.selectedSegmentIndex)
            }
          />
          <Details figures={format(details)} />
          <View style={styles.takeHome}>
            <Text style={styles.takeHomeText}>You're taking home:</Text>
            <Text style={styles.takeHomeText}>{format(net)}</Text>
          </View>
        </View>
        <View style={styles.contactUs}>
          <Pressable onPress={() => setShowContactUs((prev) => !prev)}>
            <Feather style={styles.icon} name="mail" size={36} color="white" />
          </Pressable>
        </View>
        <View style={styles.configs}>
          <Pressable onPress={() => setShowConfigs((prev) => !prev)}>
            <Feather
              style={styles.icon}
              name="settings"
              size={36}
              color="white"
            />
          </Pressable>
        </View>
        {showConfigs && (
          <Configs
            configs={configs}
            onBackgroundPress={() => setShowConfigs((prev) => !prev)}
            onChange={(name, value) =>
              setConfings({ ...configs, [name]: value })
            }
          />
        )}
        {showContactUs && (
          <ContactUs
            onBackgroundPress={() => setShowContactUs((prev) => !prev)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colours.background,
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  takeHome: {
    margin: 10,
    alignItems: "center",
  },
  takeHomeText: {
    fontWeight: "bold",
    fontSize: 23,
    margin: 5,
  },
  contactUs: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 30,
  },
  configs: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 30,
  },
  segment: {
    margin: 10,
    width: 300,
    ...(Platform.OS === "ios" ? { padding: 17 } : {}),
  },
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
  picker: {
    ...(Platform.OS === "android" ? { width: 125 } : {}),
  },
  pickerItem: {
    margin: 5,
    fontSize: 15,
    width: 100,
    height: 120,
  },
  icon: {
    color: colours.border,
  },
});
