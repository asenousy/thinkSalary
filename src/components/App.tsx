import React, { useState } from "react";
import SegmentedControl from "@react-native-community/segmented-control";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import { responsive, format } from "../helpers";
import { colours } from "../constants.json";
import Details from "./Details";
import Configs from "./Configs";
import calculate from "../calculator";
import ContactUs from "./ContactUs";
import SalaryInput from "./SalaryInput";
import ConfigsIcon from "./ConfigsIcon";
import ContactUsIcon from "./ContactUsIcon";

const timeUnitsScales = {
  Annual: 1,
  Monthly: 12,
  Weekly: 52,
  Daily: 260,
  Hourly: 2080,
};
const timeUnits = Object.keys(timeUnitsScales);
const scaleUnits = Object.values(timeUnitsScales);

export default function App() {
  const [salary, setSalary] = useState("");
  const [segment, setSegment] = useState(0);
  const [picker, setPicker] = useState(0);
  const [showConfigs, setShowConfigs] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [configs, setConfings] = useState({
    loanPlan: 0,
    pensionRate: "",
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
          <SalaryInput
            onSalaryChange={setSalary}
            timeUnit={picker}
            timeUnits={timeUnits}
            onTimeUnitChange={setPicker}
          />
          <SegmentedControl
            style={styles.segment}
            values={timeUnits}
            fontStyle={responsive({ fontSize: 13 })}
            selectedIndex={segment}
            onChange={({ nativeEvent }) =>
              setSegment(nativeEvent.selectedSegmentIndex)
            }
          />
          <Details figures={format(details)} />
          <TakeHome amount={net} />
        </View>
        <ContactUsIcon onClick={() => setShowContactUs((prev) => !prev)} />
        <ConfigsIcon onClick={() => setShowConfigs((prev) => !prev)} />
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

const TakeHome = (props: { amount: string }) => (
  <View style={styles.takeHome}>
    <Text style={styles.takeHomeText}>You're taking home:</Text>
    <Text style={styles.takeHomeText}>{format(props.amount)}</Text>
  </View>
);

const styles = StyleSheet.create(
  responsive({
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
    segment: {
      margin: 10,
      width: 315,
      ...(Platform.OS === "ios" ? { padding: 17 } : {}),
    },
  })
);
