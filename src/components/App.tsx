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
import Settings from "./Settings";
import calculate from "../calculator";
import Feedback from "./Feedback";
import SalaryInput from "./SalaryInput";
import Footer from "./Footer";

export default function App() {
  const [salary, setSalary] = useState("");
  const [segment, setSegment] = useState(1);
  const [picker, setPicker] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [configs, setConfings] = useState({
    loanPlan: 0,
    pensionRate: "0",
    scotlandTax: false,
    hoursPerWeek: "40",
  });

  const timeUnitsScales = {
    Annual: 1,
    Monthly: 12,
    Weekly: 52,
    Daily: 260,
    Hourly: 52 * +configs.hoursPerWeek,
  };
  const timeUnits = Object.keys(timeUnitsScales);
  const scaleUnits = Object.values(timeUnitsScales);

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
        <Footer
          onFeedback={() => setShowFeedback((prev) => !prev)}
          onSettings={() => setShowSettings((prev) => !prev)}
        />
        {showSettings && (
          <Settings
            configs={configs}
            onBackgroundPress={() => setShowSettings((prev) => !prev)}
            onChange={(name, value) =>
              setConfings({ ...configs, [name]: value })
            }
          />
        )}
        {showFeedback && (
          <Feedback
            onBackgroundPress={() => setShowFeedback((prev) => !prev)}
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
      backgroundColor: colours.background,
    },
    center: {
      flex: 1,
      justifyContent: "center",
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
